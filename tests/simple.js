exports.test = function(vtt, t) {
  t.equal(vtt.cues.length, 1);
  t.equal(vtt.cues[0].id, "ID");
  t.equal(vtt.cues[0].startTime, "000000000");
  t.equal(vtt.cues[0].endTime, "000002000");
  t.equal(vtt.cues[0].content, "Text");
  t.end();
}
