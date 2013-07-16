var util = require("../../lib/util.js"),
    assert = util.assert;

describe("file-layout tests", function(){

  it("cue-spacing.vtt", function(){
    assert.jsonEqual("file-layout/cue-spacing.vtt", "file-layout/cue-spacing.json");
  });

  it.skip("fail-bad-utf8.vtt", function(){
    assert.jsonEqual("file-layout/fail-bad-utf8.vtt", "file-layout/fail-bad-utf8.json");
  });

  it("garbage-signature.vtt", function(){
    var vtt = util.parse("file-layout/garbage-signature.vtt"); 
    assert.equal(vtt.cues.length, 0);
  });

  it("many-comments.vtt", function(){
    assert.jsonEqual("file-layout/many-comments.vtt", "file-layout/many-comments.json");
  });

});
