var util = require("../lib/util.js"),
    assert = util.assert;

describe("Simple VTT Tests", function(){

  it("should compare JSON to parsed result", function(){
    assert.jsonEqual("simple.vtt", "simple.json");
  });

  it("should run JS assertions on parsed result", function(){
    var vtt = util.parse("simple.vtt");
    assert.equal(vtt.cues.length, 1);

    var cue0 = vtt.cues[0];
    assert.equal(cue0.id, "ID");
    assert.equal(cue0.startTime, 0);
    assert.equal(cue0.endTime, 2);
    assert.equal(cue0.content, "Text");
  });

});
