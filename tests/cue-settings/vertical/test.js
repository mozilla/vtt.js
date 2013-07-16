var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cue-settings/vertical tests", function(){

  it("bogus-value.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/bogus-value.vtt", "cue-settings/vertical/bad-vertical.json");
  });

  it("capital-keyword.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/capital-keyword.vtt", "cue-settings/vertical/bad-vertical.json");
  });

  it("correct-lr-keyword.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/correct-lr-keyword.vtt", "cue-settings/vertical/correct-lr-keyword.json");
  });

  it("correct-rl-keyword.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/correct-rl-keyword.vtt", "cue-settings/vertical/correct-rl-keyword.json");
  });

  it("incorrect-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/incorrect-delimiter.vtt", "cue-settings/vertical/bad-vertical.json");
  });

  it("incorrect-keyword.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/incorrect-keyword.vtt", "cue-settings/vertical/bad-vertical.json");
  });

  it("no-value.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/no-value.vtt", "cue-settings/vertical/bad-vertical.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/space-after-delimiter.vtt", "cue-settings/vertical/bad-vertical.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/vertical/space-before-delimiter.vtt", "cue-settings/vertical/bad-vertical.json");
  });

});
