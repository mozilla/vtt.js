/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

// We throw this exception if parsing fails.
var ParseError = {};

// Throw a parse error if condition is not met.
function expect(cond) {
  if (!cond)
    throw ParseError;
}

function parseCue(input, cue) {
  // 4.8.10.13.3 Collect a WebVTT timestamp.
  function parseTimeStamp() {
    var match = input.match(/^(\d{2,}:)?([0-5][0-9]):([0-5][0-9])\.(\d{3})/);
    expect(!!match);
    // Remove matched substring from input.
    input = input.substr(match.input.length);
    // Hours are optional, and include a trailing ":", which we have to strip first.
    var h = match[1] ? match[1].replace(":", "") | 0 : 0;
    var m = match[2] | 0;
    var s = match[3] | 0;
    var f = match[4] | 0;
    return h * 3600 + m * 60 + s + f * 0.001;
  }

  function skipWhitespace() {
    input = input.replace(/^\s+/, "");
  }

  // 4.8.10.13.3 Collect WebVTT cue timings and settings.
  skipWhitespace();
  cue.startTime = parseTimeStamp();     // (4) collect cue start time
  skipWhitespace();
  expect(input.substr(0, 3) === "-->"); // (6-8) next characters must match "-->"
  skipWhitespace();
  cue.endTime = parseTimeStamp();       // (10) collect cue end time

  // 4.8.10.13.4 Parse the WebVTT settings for the cue.
  skipWhitespace();
  cue.settings = input.split(/\s/);     // (1) split on spaces
}

const BOM = "\xEF\xBB\xBF";
const WEBVTT = "WEBVTT";

function ParseWebVTT() {
  this.state = "INITIAL";
  this.buffer = "";
}

ParseWebVTT.prototype = {
  parse: function (data) {
    this.buffer += data;

    function collectNextLine() {
      var buffer = this.buffer;
      var pos = 0;
      while (pos < buffer.length && buffer[pos] != '\r' && buffer[pos] != '\n')
        ++pos;
      var line = decodeURIComponent(escape(buffer.substr(0, pos)));
      if (buffer[pos] === '\r')
        ++pos;
      if (buffer[pos] === '\n')
        ++pos;
      this.buffer = buffer.substr(pos);
      return line;
    }

    // 4.8.10.13.3 WHATWG WebVTT Parser algorithm.

    if (this.state === "INITIAL") {
      // Wait until we have enough data to parse the header.
      if (this.buffer.length < BOM.length + WEBVTT.length)
        return;
      // Skip the optional BOM.
      if (this.buffer.substr(0, BOM.length) === BOM)
        this.buffer = this.buffer.substr(BOM.length);
      // (4-12) - Check for the "WEBVTT" identifier followed by an optional space or tab,
      // and ignore the rest of the line.
      var line = collectNextLine();
      if (line.substr(0, WEBVTT.length) !== WEBVTT ||
          line.length > WEBVTT.length && !/[ \t]/.test(line[WEBVTT.length])) {
        this.onerror && this.onerror();
        return;
      }
      this.state = "HEADER";
    }

    // We can't parse a line until we have the full line.
    if (!/[\r\n]/.test(this.buffer))
      return;

    while (this.buffer) {
      var line = collectNextLine();

      switch (this.state) {
      case "HEADER":
        // 13-18 - Allow a header (comment area) under the WEBVTT line.
        if (!line)
          this.state = "ID";
        continue;
      case "NOTE":
        // Ignore NOTE blocks.
        if (!line)
          this.state = "ID";
        continue;
      case "ID":
        // Check for the start of NOTE blocks.
        if (/^NOTE($|[ \t])/.test(line)) {
          this.state = "NOTE";
          break;
        }
        // 19-29 - Allow any number of line terminators, then initialize new cue values.
        if (!line)
          continue;
        this.currentCue = {
          id: "",
          settings: "",
          startTime: 0,
          endTime: 0,
          contnet: ""
        };
        this.state = "CUE";
        // 30-39 - Check if this line contains an optional identifier or timing data.
        if (line.indexOf("-->") == -1) {
          this.cue.id = line;
          continue;
        }
        // Fall through, process line as start of a cue.
      case "CUE":
        // 40 - Collect cue timings and settings.
        try {
          parseCue(line, this.cue);
        } catch (e) {
          // In case of an error ignore this cue.
          this.state = "BADCUE";
          continue;
        }
        this.state = "CUETEXT";
        continue;
      case "CUETEXT":
        // 41-53 - Collect the cue text, create a cue, and add it to the output.
        if (!line) {
          // We are done parsing this cue.
          this.oncue && this.oncue(this.cue);
          this.cue = null;
          this.state = "ID";
          continue;
        }
        if (!this.cue.content)
          this.cue.content += "\n";
        this.cue.content += line;
        continue;
      default: // BADCUE
        // 54-62 - Collect and discard the remaining cue.
        if (!line) {
          this.state = "ID";
          continue;
        }
        continue;
      }
    }
  }
};
