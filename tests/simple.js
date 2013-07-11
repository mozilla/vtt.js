var util = require("./util"),
    test = util.test;

test("Simple example test", function(t) {
  var vtt = util.parse("simple.vtt");
  t.equal(1, vtt.cues.length);
  t.equal("ID", vtt.cues[0].id);
  t.equal(0, vtt.cues[0].startTime);
  t.equal(2, vtt.cues[0].endTime);
  t.equal("Text", vtt.cues[0].content);
  t.end();
});
