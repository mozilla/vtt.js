var util = require("../../lib/util.js"),
    assert = util.assert;

describe("cue-times tests", function(){

  it("fraction-digits.vtt", function(){
    var vtt = util.parse("cue-times/fraction-digits.vtt");
    assert.equal(vtt.cues.length, 0);
  });

  it("fractions.vtt", function(){
    assert.jsonEqual("cue-times/fractions.vtt", "cue-times/fractions.json");
  });

  it("incorrect-delimiter.vtt", function(){
    var vtt = util.parse("cue-times/incorrect-delimiter.vtt");
    assert.equal(vtt.cues.length, 0);
  });

  it("max-spot-digits.vtt", function(){
    assert.jsonEqual("cue-times/max-spot-digits.vtt", "cue-times/max-spot-digits.json");
  });

  it("max-spots-over-sixty.vtt", function(){
    assert.jsonEqual("cue-times/max-spots-over-sixty.vtt", "cue-times/max-spots-over-sixty.json");
  });

  it("max-time-spots.vtt", function(){
    assert.jsonEqual("cue-times/max-time-spots.vtt", "cue-times/max-time-spots.json");
  });

  it("min-mid-digits.vtt", function(){
    var vtt = util.parse("cue-times/min-mid-digits.vtt");
    assert.equal(vtt.cues.length, 0);
  });

  it("min-top-digits.vtt", function(){
    var vtt = util.parse("cue-times/min-top-digits.vtt");
    assert.equal(vtt.cues.length, 0);
  });

  it.skip("minimum-spots-over-sixty.vtt", function(){
    assert.jsonEqual("cue-times/minimum-spots-over-sixty.vtt", "cue-times/minimum-spots-over-sixty.json");
  });

  it("minimum-time-spots.vtt", function(){
    assert.jsonEqual("cue-times/minimum-time-spots.vtt", "cue-times/minimum-time-spots.json");
  });

  it("mismatched-time-spots.vtt", function(){
    assert.jsonEqual("cue-times/mismatched-time-spots.vtt", "cue-times/mismatched-time-spots.json");
  });

});
