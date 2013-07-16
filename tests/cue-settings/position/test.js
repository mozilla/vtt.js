var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cue-settings/position tests", function(){

  it("bad-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/position/bad-delimiter.vtt", "cue-settings/position/bad-position.json");
  });

  it("bad-position.vtt", function(){
    assert.jsonEqual("cue-settings/position/bad-position.vtt", "cue-settings/position/bad-position.json");
  });

  it("bad-value.vtt", function(){
    assert.jsonEqual("cue-settings/position/bad-value.vtt", "cue-settings/position/bad-position.json");
  });

  it("bogus-value.vtt", function(){
    assert.jsonEqual("cue-settings/position/bogus-value.vtt", "cue-settings/position/bad-position.json");
  });

  it("integer-value.vtt", function(){
    assert.jsonEqual("cue-settings/position/integer-value.vtt", "cue-settings/position/bad-position.json");
  });

  it("just-percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/position/just-percent-value.vtt", "cue-settings/position/bad-position.json");
  });

  it("negative-percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/position/negative-percent-value.vtt", "cue-settings/position/bad-position.json");
  });

  it("percent-over.vtt", function(){
    assert.jsonEqual("cue-settings/position/percent-over.vtt", "cue-settings/position/bad-position.json");
  });

  it("percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/position/percent-value.vtt", "cue-settings/position/percent-value.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/position/space-after-delimiter.vtt", "cue-settings/position/bad-position.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/position/space-before-delimiter.vtt", "cue-settings/position/bad-position.json");
  });

});
