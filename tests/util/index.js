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

function runTest(name, assertions, vtt) {
  tape(name, function(t) {
    assertions(vtt, t);
  });
}

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

  runTest(filename, assertions, result);
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

    runTest(filename + " - streaming (n=" + n + ")", assertions, result);
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
