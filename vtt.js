/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

// Try to parse input as a time stamp.
function parseTimeStamp(input) {
  var m = input.match(/^(\d{2,}:)?([0-5][0-9]):([0-5][0-9])\.(\d{3})/);
  if (!m)
    return null;
  // Hours are optional, and include a trailing ":", which we have to strip first.
  return (m[1] ? m[1].replace(":", "") : "00") + m[2] + m[3] + m[4];
}

// A settings object holds key/value pairs and will ignore anything but the first
// assignment to a specific key.
function Settings() {
  this.values = Object.create(null);
}

Settings.prototype = {
  // Only accept the first assignment to any key.
  set: function(k, v) {
    if (!this.get(k) && v !== "")
      this.values[k] = v;
  },
  // Return the value for a key, or a default value.
  get: function(k, dflt) {
    return this.has(k) ? this.values[k] : dflt;
  },
  // Check whether we have a value for a key.
  has: function(k) {
    return k in this.values;
  },
  // Accept a setting if its one of the given alternatives.
  alt: function(k, v, a) {
    for (var n = 0; n < a.length; ++n) {
      if (v === a[n]) {
        this.set(k, v);
        break;
      }
    }
  },
  // Accept a region if it doesn't have the special string '-->'
  region: function(k, v) {
    if(!v.match(/-->/)) {
      this.set(k, v);
    }
  },
  // Accept a setting if its a valid (signed) integer.
  integer: function(k, v) {
    if (/^-?\d+$/.test(v)) // integer
      this.set(k, parseInt(v, 10));
  },
  // Accept a setting if its a valid percentage.
  percent: function(k, v, frac) {
    if (/^\d+%$/.test(v)) {
      v = v.replace("%", "");
      v = frac ? (v * 1) : (v | 0);
      if (v >= 0 && v <= 100)
        this.set(k, parseInt(v, 10));
    }
  }
};

// Helper function to parse input into groups separated by 'groupDelim', and
// interprete each group as a key/value pair separated by 'keyValueDelim'.
function parseOptions(input, callback, keyValueDelim, groupDelim) {
  var groups = groupDelim ? input.split(groupDelim) : [input];
  for (var i in groups) {
    var kv = groups[i].split(keyValueDelim);
    if (kv.length !== 2)
      continue;
    var k = kv[0];
    var v = kv[1];
    callback(k, v);
  }
}

function parseCue(input, cue) {
  // 4.1 WebVTT timestamp
  function consumeTimeStamp() {
    var ts = parseTimeStamp(input);
    if (ts === null)
      throw "error";
    // Remove time stamp from input.
    input = input.replace(/^[^\s-]+/, "");
    return ts;
  }

  // 4.4.2 WebVTT cue settings
  function consumeCueSettings(input) {
    var settings = new Settings();

    parseOptions(input, function (k, v) {
      switch (k) {
      case "region":
        settings.region(k, v);
        break;
      case "vertical":
        settings.alt(k, v, ["rl", "lr"]);
        break;
      case "line":
        settings.integer(k, v);
        settings.percent(k, v);
        settings.alt(k, v, ["auto"]);
        break;
      case "position":
      case "size":
        settings.percent(k, v);
        break;
      case "align":
        settings.alt(k, v, ["start", "middle", "end", "left", "right"]);
        break;
      }
    }, /:/, /\s/);

    // Apply default values for any missing fields.
    return {
      region: settings.get("region", ""),
      vertical: settings.get("vertical", ""),
      line: settings.get("line", "auto"),
      position: settings.get("position", 50),
      size: settings.get("size", 100),
      align: settings.get("align", "middle")
    };
  }

  function skipWhitespace() {
    input = input.replace(/^\s+/, "");
  }

  // 4.1 WebVTT cue timings.
  skipWhitespace();
  cue.startTime = consumeTimeStamp();   // (1) collect cue start time
  skipWhitespace();
  if (input.substr(0, 3) !== "-->")     // (3) next characters must match "-->"
    throw "error";
  input = input.substr(3);
  skipWhitespace();
  cue.endTime = consumeTimeStamp();     // (5) collect cue end time

  // 4.1 WebVTT cue settings list.
  skipWhitespace();
  cue.settings = consumeCueSettings(input);
}

const ESCAPE = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&lrm;": "\u200e",
  "&rlm;": "\u200f",
  "&nbsp;": "\u00a0"
};

const TAG_NAME = {
  c: "c",
  i: "i",
  b: "b",
  u: "u",
  ruby: "ruby",
  rt: "rt",
  v: "span",
  lang: "span"
};

const TAG_ANNOTATION = {
  v: "title",
  lang: "lang"
};

const NEEDS_PARENT = {
  rt: "ruby"
};

// Parse content into a document fragment.
function parseContent(window, input) {
  function nextToken() {
    // Check for end-of-string.
    if (!input)
      return null;

    // Consume 'n' characters from the input.
    function consume(result) {
      input = input.substr(result.length);
      return result;
    }

    var m = input.match(/^([^<]*)(<[^>]+>?)?/);
    // If there is some text before the next tag, return it, otherwise return
    // the tag.
    return consume(m[1] ? m[1] : m[2]);
  }

  // Unescape a string 's'.
  function unescape1(e) {
    return ESCAPE[e];
  }
  function unescape(s) {
    while ((m = s.match(/^[^<&]*(&(amp|lt|gt|lrm|rlm|nbsp);)/)) !== null)
      s = s.replace(m[1], unescape1);
    return s;
  }

  function shouldAdd(current, element) {
    return NEEDS_PARENT[element.localName] == current.localName;
  }

  var fragment = new window.DocumentFragment();

  // Create an element for this tag.
  function createElement(type, annotation) {
    var tagName = TAG_NAME[type];
    if (!tagName)
      return null;
    var element = fragment.createElement(tagName);
    element.localName = type;
    var name = TAG_ANNOTATION[type];
    if (name && annotation)
      element[name] = annotation.trim();
    return element;
  }

  var current = fragment;
  var t;
  while ((t = nextToken()) !== null) {
    if (t[0] === '<') {
      if (t[1] === "/") {
        // If the closing tag matches, move back up to the parent node.
        if (current.localName === t.substr(2).replace(">", ""))
          current = current.parentNode;
        // Otherwise just ignore the end tag.
        continue;
      }
      var ts = parseTimeStamp(t.substr(1, t.length - 2));
      var node;
      if (ts) {
        // Timestamps are lead nodes as well.
        node = window.ProcessingInstruction();
        node.target = "timestamp";
        node.data = ts;
        current.appendChild(node);
        continue;
      }
      var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
      // If we can't parse the tag, skip to the next tag.
      if (!m)
        continue;
      // Try to construct an element, and ignore the tag if we couldn't.
      node = createElement(m[1], m[3]);
      if (!node)
        continue;
      // Determine if the tag should be added based on the context of where it
      // is placed in the cuetext.
      if (!shouldAdd(current, node)) 
        continue;
      // Set the class list (as a list of classes, separated by space).
      if (m[2])
        node.className = m[2].substr(1).replace('.', ' ');
      // Append the node to the current node, and enter the scope of the new
      // node.
      current.appendChild(node);
      current = node;
      continue;
    }

    // Text nodes are leaf nodes.
    current.appendChild(fragment.createTextNode(unescape(t)));
  }

  return fragment;
}

const BOM = "\uFEFF";
const WEBVTT = "WEBVTT";

function WebVTTParser() {
  this.state = "INITIAL";
  this.buffer = "";
}

WebVTTParser.convertCueToDOMTree = function(window, cue) {
  if (!window || !cue || !cue.content)
    return null;
  return parseContent(window, cue.content);
};

WebVTTParser.prototype = {
  parse: function (data) {
    var self = this;

    // Deal with utf8 binary data if we don't get a string. We may or may
    // not get enough bytes to build a character/string (e.g., multi-byte).
    if (data && typeof data !== "string") {
      var decoder = self.decoder = self.decoder || TextDecoder("utf8"),
          decoded = decoder.decode(data, {stream: true});
      if (decoded) {
        data = decoded;
        data += decoder.decode();
        delete self.decoder;
      } else {
        // Need more bytes before we have a full character/string,
        // clear data and let parse() complete without updating buffer.
        data = null;
      }
    }

    if (data)
      self.buffer += data;

    // Advance tells whether or not to remove the collected line from the buffer
    // after it is read.
    function collectNextLine(advance) {
      var buffer = self.buffer;
      var pos = 0;
      advance = typeof advance === "undefined" ? true : advance;      
      while (pos < buffer.length && buffer[pos] != '\r' && buffer[pos] != '\n')
        ++pos;
      var utf8 = buffer.substr(0, pos);
      // Advance the buffer early in case we fail below.
      if (buffer[pos] === '\r')
        ++pos;
      if (buffer[pos] === '\n')
        ++pos;
      if (advance)
        self.buffer = buffer.substr(pos);
      var line;
      try {
        line = utf8; // TODO: what about the parse(string) case? --> decodeURIComponent(escape(utf8));
      } catch (e) {
        throw "error";
      }
      return line;
    }

    // 3.4 WebVTT region and WebVTT region settings syntax
    function parseRegion(input) {
      var region = new Settings();

      parseOptions(input, function (k, v) {
        switch (k) {
        case "id":
          // The string must not contain the substring "-->".
          if (v.indexOf("-->") !== -1)
            return;
          region.set(k, v);
          break;
        case "width":
          region.percent(k, v, true);
          break;
        case "lines":
          region.integer(k, v);
          break;
        case "regionanchor":
        case "viewportanchor":
          var xy = v.split(',');
          if (xy.length !== 2)
            break;
          // We have to make sure both x and y parse, so use a temporary
          // settings object here.
          var anchor = new Settings();
          anchor.percent("x", xy[0]);
          anchor.percent("y", xy[1]);
          if (!anchor.has("x") || !anchor.has("y"))
            break;
          region.set(k + "X", anchor.get("x"));
          region.get(k + "Y", anchor.get("y"));
          break;
        case "scroll":
          region.alt(k, v, ["up"]);
          break;
        }
      }, /=/, /\s/);

      // Register the region, using default values for any values that were not
      // specified.
      if (self.onregion && region.has("id")) {
        self.onregion({
          id: region.get("id"),
          width: region.get("width", 100),
          lines: region.get("lines", 3),
          regionAnchorX: region.get("regionanchorX", 0),
          regionAnchorY: region.get("regionanchorY", 100),
          viewportAnchorX: region.get("viewportanchorX", 0),
          viewportAnchorY: region.get("viewportanchorY", 100),
          scroll: region.get("scroll", "none")
        });
      }
    }

    // 3.2 WebVTT metadata header syntax
    function parseHeader(input) {
      parseOptions(input, function (k, v) {
        switch (k) {
        case "Region":
          // 3.3 WebVTT region metadata header syntax
          parseRegion(v);
          break;
        }
      }, /:/);
    }

    // 5.1 WebVTT file parsing.
    try {
      var line;
      if (self.state === "INITIAL") {
        // Wait until we have enough data to parse the header.
        if (self.buffer.length < BOM.length + WEBVTT.length)
          return this;
        // Skip the optional BOM.
        if (self.buffer.substr(0, BOM.length) === BOM)
          self.buffer = self.buffer.substr(BOM.length);

        // Collect the next line, but do not remove the collected line from the
        // buffer as we may not have the full WEBVTT signature yet when
        // incrementally parsing.
        line = collectNextLine(false);
        // (4-12) - Check for the "WEBVTT" identifier followed by an optional space or tab,
        // and ignore the rest of the line.
        if (line.substr(0, WEBVTT.length) !== WEBVTT ||
            line.length > WEBVTT.length && !/[ \t]/.test(line[WEBVTT.length])) {
          throw "error";
        }
        // Now that we've read the WEBVTT signature we can remove it from
        // the buffer.
        collectNextLine(true);
        self.state = "HEADER";
      }

      while (self.buffer) {
        // We can't parse a line until we have the full line.
        if (!/[\r\n]/.test(self.buffer)) {
          // If we are in the midst of parsing a cue, report it early. We will report it
          // again when updates come in.
          if (self.state === "CUETEXT" && self.cue && self.onpartialcue)
            self.onpartialcue(self.cue);
          return this;
        }

        line = collectNextLine();

        switch (self.state) {
        case "HEADER":
          // 13-18 - Allow a header (metadata) under the WEBVTT line.
          if (/:/.test(line)) {
            parseHeader(line);
          } else if (!line) {
            // An empty line terminates the header and starts the body (cues).
            self.state = "ID";
          }
          continue;
        case "NOTE":
          // Ignore NOTE blocks.
          if (!line)
            self.state = "ID";
          continue;
        case "ID":
          // Check for the start of NOTE blocks.
          if (/^NOTE($|[ \t])/.test(line)) {
            self.state = "NOTE";
            break;
          }
          // 19-29 - Allow any number of line terminators, then initialize new cue values.
          if (!line)
            continue;
          self.cue = {
            id: "",
            settings: "",
            startTime: 0,
            endTime: 0,
            content: ""
          };
          self.state = "CUE";
          // 30-39 - Check if self line contains an optional identifier or timing data.
          if (line.indexOf("-->") == -1) {
            self.cue.id = line;
            continue;
          }
          // Process line as start of a cue.
          /*falls through*/
        case "CUE":
          // 40 - Collect cue timings and settings.
          try {
            parseCue(line, self.cue);
          } catch (e) {
            // In case of an error ignore rest of the cue.
            self.cue = null;
            self.state = "BADCUE";
            continue;
          }
          self.state = "CUETEXT";
          continue;
        case "CUETEXT":
          // 41-53 - Collect the cue text, create a cue, and add it to the output.
          if (!line) {
            // We are done parsing self cue.
            self.oncue && self.oncue(self.cue);
            self.cue = null;
            self.state = "ID";
            continue;
          }
          if (self.cue.content)
            self.cue.content += "\n";
          self.cue.content += line;
          continue;
        default: // BADCUE
          // 54-62 - Collect and discard the remaining cue.
          if (!line) {
            self.state = "ID";
            continue;
          }
          continue;
        }
      }
    } catch (e) {
      // If we are currently parsing a cue, report what we have, and then the error.
      if (self.state === "CUETEXT" && self.cue && self.oncue)
        self.oncue(self.cue);
      self.cue = null;
      // Report the error and enter the BADCUE state, except if we haven't even made
      // it through the header yet.
      if (self.state !== "INITIAL")
        self.state = "BADCUE";
    }
    return this;
  },
  flush: function () {
    var self = this;
    if (self.cue || self.state === "HEADER") {
      // Synthesize the end of the current cue or region.
      self.buffer += "\n\n";
      self.parse();
    }
    self.onflush && self.onflush();
    return this;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports.WebVTTParser = WebVTTParser;
}
