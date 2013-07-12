var util = require("../../util");
var path = require("path");

function runTest(fileName, expectedJson, msg) {
  var absFileName = path.join(__dirname, fileName);
  var expected = require("./" + expectedJson);

  util.parseTest(absFileName, function(vtt, t) {
    t.deepEqual(vtt.cues[0], expected, msg);
    t.end();
  });
}

exports.test = function() {
  var msg = "Should be equal";
  runTest("bogus-value.vtt", "bad-vertical.json", msg);
  runTest("capital-keyword.vtt", "bad-vertical.json", msg);
  runTest("incorrect-delimiter.vtt", "bad-vertical.json", msg);
  runTest("no-value.vtt", "bad-vertical.json", msg);
  runTest("space-after-delimiter.vtt", "bad-vertical.json", msg);
  runTest("space-before-delimiter.vtt", "bad-vertical.json", msg);
  runTest("correct-lr-keyword.vtt", "correct-lr-keyword.json", msg);
  runTest("correct-rl-keyword.vtt", "correct-rl-keyword.json", msg);
}