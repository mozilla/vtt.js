var util = require("./util");

util.parseTest("simple.vtt", function(vtt, t) {
  t.equal(vtt.cues.length, 1);
  t.equal(vtt.cues[0].id, "ID");
  t.equal(vtt.cues[0].startTime, 0);
  t.equal(vtt.cues[0].endTime, 2);
  t.equal(vtt.cues[0].content, "Text");
  t.end();
});
