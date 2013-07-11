/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

// We throw this exception if parsing fails.
function ParseError(msg) {
  this.msg = msg;
}

function reportError(input, msg) {
  msg = msg.replace("%", "'" + input.replace(/^[^\s]+/, "") + "'");
  throw new ParseError(msg);
}

function parseCue(input, cue) {
  // 4.1 WebVTT timestamp
  function parseTimeStamp() {
    var match = input.match(/^(\d{2,}:)?([0-5][0-9]):([0-5][0-9])\.(\d{3})/);
    if (!match)
      reportError(input, "invalid timestamp %");
    // Remove time stamp from input.
    input = input.replace(/^[^\s]+/, "");
    // Hours are optional, and include a trailing ":", which we have to strip first.
    var h = match[1] ? match[1].replace(":", "") | 0 : 0;
    var m = match[2] | 0;
    var s = match[3] | 0;
    var f = match[4] | 0;
    return h * 3600 + m * 60 + s + f * 0.001;
  }

  // 4.4.2 WebVTT cue settings
  function parseCueSettings(input) {
    var settings = Object.create(null);

    // Each setting must not be included more than once per WebVTT cue settings list.
    function set(k, v) {
      if (!settings[k])
        settings[k] = v;
    }

    // Accept a setting if its one of the given alternatives.
    function alt(k, v, a) {
      for (var n = 0; n < a.length; ++n) {
        if (v === a[n]) {
          set(k, v);
          break;
        }
      }
    }

    // Accept a setting if its a valid (signed) integer.
    function integer(k, v) {
      if (/^-?\d+$/.test(v)) // integer
        set(k, v);
    }

    // Accept a setting if its a valid percentage.
    function percent(k, v) {
      if (/^\d+%$/.test(v)) {
        v = v.replace("%", "") | 0;
        if (v >= 0 && v <= 100)
          set(k, v + "%");
      }
    }

    var list = input.split(/\s/);
    for (var i in list) {
      var kv = list[i].split(':');
      if (kv.length !== 2)
        continue;
      var k = kv[0].trim();
      var v = kv[1].trim();
      switch (k) {
      case "region":
        set(k, v);
        break;
      case "vertical":
        alt(k, v, ["rl", "lr"]);
        break;
      case "line":
        integer(k, v);
        percent(k, v);
        break;
      case "position":
      case "size":
        percent(k, v);
        break;
      case "align":
        alt(k, v, ["start", "middle", "end", "left", "right"]);
        break;
      }
    }

    return settings;
  }

  function skipWhitespace() {
    input = input.replace(/^\s+/, "");
  }

  // 4.1 WebVTT cue timings.
  skipWhitespace();
  cue.startTime = parseTimeStamp();     // (1) collect cue start time
  skipWhitespace();
  if (input.substr(0, 3) !== "-->")     // (3) next characters must match "-->"
    reportError(input, "'-->' expected, got %");
  input = input.substr(3);
  skipWhitespace();
  cue.endTime = parseTimeStamp();       // (5) collect cue end time

  // 4.1 WebVTT cue settings list.
  skipWhitespace();
  cue.settings = parseCueSettings(input);
}

const BOM = "\xEF\xBB\xBF";
const WEBVTT = "WEBVTT";

function WebVTTParser() {
  this.state = "INITIAL";
  this.buffer = "";
}

WebVTTParser.prototype = {
  parse: function (data) {
    var self = this;

    if (data)
      self.buffer += data;

    function collectNextLine() {
      var buffer = self.buffer;
      var pos = 0;
      while (pos < buffer.length && buffer[pos] != '\r' && buffer[pos] != '\n')
        ++pos;
      var utf8 = buffer.substr(0, pos);
      // Advance the buffer early in case we fail below.
      if (buffer[pos] === '\r')
        ++pos;
      if (buffer[pos] === '\n')
        ++pos;
      self.buffer = buffer.substr(pos);
      var line;
      try {
        line = decodeURIComponent(escape(utf8));
      } catch (e) {
        reportError(buffer, "invalid UTF8 encoding in '" + buffer.substr(0, pos).replace(/[\r\n]/g, "") + "'");
      }
      return line;
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
        // (4-12) - Check for the "WEBVTT" identifier followed by an optional space or tab,
        // and ignore the rest of the line.
        line = collectNextLine();
        if (line.substr(0, WEBVTT.length) !== WEBVTT ||
            line.length > WEBVTT.length && !/[ \t]/.test(line[WEBVTT.length])) {
          reportError(line, "invalid signature '" + line + "'");
          return this;
        }
        self.state = "HEADER";
      }

      while (self.buffer) {
        // We can't parse a line until we have the full line.
        if (!/[\r\n]/.test(self.buffer)) {
          // If we are in the midst of parsing a cue, report it early. We will report it
          // again when updates come in.
          if (self.state === "CUETEXT" && self.cue && self.oncue)
            self.oncue(self.cue);
          return this;
        }

        line = collectNextLine();

        switch (self.state) {
        case "HEADER":
          // 13-18 - Allow a header (comment area) under the WEBVTT line.
          if (!line)
            self.state = "ID";
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
            self.onerror && self.onerror(e.msg);
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
      self.onerror && self.onerror(e.msg);
      if (self.state !== "INITIAL")
        self.state = "BADCUE";
    }
    return this;
  },
  flush: function () {
    var self = this;
    if (self.state !== "INITIAL" && self.state !== "ID") {
      // Synthesize the end of the current block.
      self.buffer += "\n\n";
      self.parse();
      if (self.buffer) {
        // Incompletely parsed file.
        self.onerror && self.onerror("unparsed input");
      }
    }
    self.onflush && self.onflush();
    return this;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports.WebVTTParser = WebVTTParser;
}
