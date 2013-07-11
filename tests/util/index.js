var WebVTTParser = require("../..").WebVTTParser,
    tape = require("tape"),
    fs = require("fs");

// Add some things to tape.
tape.Test.prototype.expect = function(n) {
  return tape.Test.prototype.plan(n);
};
tape.Test.prototype.assertCue = function(a, b, msg, extra) {
  return tape.Test.prototype.deepEqual(a, b, msg, extra);
};

function parse(filename, streaming) {
  streaming = streaming === true;

  var result = {
    cues: [],
    errors: []
  };

  var p = new WebVTTParser();
  p.oncue = function(cue)   { result.cues.push(cue); };
  p.onerror = function(err) { result.cues.push(err); };

  var vtt = fs.readFileSync(filename, "utf8");

  // Parse the file in chunks (streaming), or whole.
  if (streaming) {
    for (var n = 0; n < vtt.length; ++n) {
      p.parse(vtt.substr(0, n));
      p.parse(vtt.substr(n));
    }
    p.flush();
  } else {
    p.parse(vtt);
    p.flush();
  }

  return result;
}

module.exports = {
  WebVTTParser: WebVTTParser,
  parse: parse,
  test: tape
};
