/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

// We throw this exception if parsing fails.
var ParseError = {};

function isSpaceOrTab(ch) {
  return ch === ' ' || ch === '\t';
}

function isWhiteSpace(ch) {
  return isSpaceOrTab(ch) || ch === '\n' || ch == '\f' || ch == '\r';
}

function isDigit(ch) {
  return ch >= '0' && ch <= '9';
}

function parseCue(input, cue) {
  var pos = 0;

  function skipWhiteSpace() {
    while (isWhiteSpace(input[pos]))
      ++pos;
  }

  function parseDigits() {
    var start = pos;
    while (isDigit(input[pos]))
      ++pos;
    return input.substr(start, pos - start);
  }

  function current() {
    return input[pos];
  }

  function next() {
    return input[pos++];
  }

  function expect(ok) {
    if (!ok)
      throw ParseError;
  }

  function parseTimeStamp() {
    // 4.8.10.13.3 Collect a WebVTT timestamp.
    // 1-4 - Initial checks, let most significant units be minutes.
    var mode = 'MINUTES';

    // 5-6 - Collect a sequence of characters that are 0-9.
    var digits1 = parseDigits();
    var value1 = digits1 | 0;

    // 7 - If not 2 characters or value is greater than 59, interpret as hours.
    expect(digits1);
    if (digits1.length !== 2 || value1 > 59)
      mode = 'HOURS';

    // 8-12 - Collect the next sequence of 0-9 after ':' (must be 2 chars).
    expect(next() == ':');
    var digits2 = parseDigits();
    var value2 = digits2 | 0;
    expect(digits2.length === 2);

    // 13 - Detect whether this timestamp includes hours.
    var value3;
    if (mode === 'HOURS' || current() === ':') {
      expect(':');
      var digits3 = parseDigits();
      expect(digits3.length === 2);
      value3 = digits3 | 0;
    } else {
      value3 = value2;
      value2 = value1;
      value1 = 0;
    }

    // 14-19 - Collect next sequence of 0-9 after '.' (must be 3 chars).
    expect(next() === '.');
    var digits4 = parseDigits();
    expect(digits4.length === 3);
    var value4 = digits4 | 0;
    expect(value2 <= 59 && value3 <= 59);

    input = input.substr(pos);

    // 20-21 - Calculate result.
    return value1 * 60 * 60 + value2 * 60 + value + value * 0.001;
  }

  // 4.8.10.13.3 Collect WebVTT cue timings and settings.

  // 1-3 - Skip white space at the beginning of the line.
  skipWhiteSpace();

  // 4-5 - Collect a WebVTT timestamp. If that fails, then abort and return
  // failure. Otherwise, let cue's text track cue start time be the collected
  // time.
  cue.startTime = parseTimeStamp();
  expect(isSpaceOrTab(next()));
  skipWhiteSpace();

  // 6-9 - If the next three characters are not "-->", abort and return failure.
  expect(next(3) === "-->");
  expect(isSpaceOrTab(next()));
  skipWhiteSpace();

  // 10-11 - Collect a WebVTT timestamp. If that fails, then abort and return
  // failure. Otherwise, let cue's text track cue end time be the collected
  // time.
  cue.endTime = parseTimeStamp();
  skipWhiteSpace();

  // 12 - Parse the WebVTT settings for the cue.
  cue.settings = input.substr(pos);
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
      // 4-12 - Check for the "WEBVTT" identifier followed by an optional space or tab,
      // and ignore the rest of the line.
      var line = collectNextLine();
      if (line.length < WEBVTT.length ||
          line.substr(0, WEBVTT.length) != WEBVTT ||
          line.length > WEBVTT.length && line[WEBVTT.length] != ' ' && line[WEBVTT.length] != '\t') {
        this.onerror && this.onerror();
        return;
      }
      this.state = "HEADER";
    }

    // We can't parse a line until we have the full line.
    if (this.buffer.indexOf('\r') == -1 && this.buffer.indexOf('\n') == -1)
      return;

    while (this.buffer) {
      var line = collectNextLine();

      switch (this.state) {
      case "HEADER":
        // 13-18 - Allow a header (comment area) under the WEBVTT line.
        if (!line)
          this.state = "ID";
        continue;
      case "ID":
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
