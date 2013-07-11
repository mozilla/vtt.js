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

function parseWhole(filename, assertions) {
  var result = {
    cues: [],
    errors: []
  };

  var p = new WebVTTParser();
  p.oncue = function(cue)   { result.cues.push(cue); };
  p.onerror = function(err) { result.cues.push(err); };

  p.parse(fs.readFileSync(filename, "utf8"));
  p.flush();

  tape(filename, function(t) {
    assertions(result, t);
  });
}

function parseStreaming(filename, assertions) {
  var vtt = fs.readFileSync(filename, "utf8");

  for (var n = 0; n < vtt.length; ++n) {
    var result = {
      cues: [],
      errors: []
    };

    var p = new WebVTTParser();
    p.oncue = function(cue)   { result.cues.push(cue); };
    p.onerror = function(err) { result.cues.push(err); };

    p.parse(vtt.substr(0, n));
    p.parse(vtt.substr(n));
    p.flush();

    tape(filename + " - streaming (n=" + n + ")", function(t) {
      assertions(result, t);
    });
  }
}

module.exports = {
  WebVTTParser: WebVTTParser,
  parseTest: function(filename, assertions) {
    // Run assertions on file whole and streaming.
    parseWhole(filename, assertions);
    parseStreaming(filename, assertions);
  },
  parseWholeTest: parseWhole,
  parseStreamingTest: parseStreaming,
  test: tape
};
