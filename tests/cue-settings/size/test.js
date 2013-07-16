var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cue-settings/size tests", function(){

  it("bad-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/size/bad-delimiter.vtt", "cue-settings/size/bad-size.json");
  });

  it("bad-size.vtt", function(){
    assert.jsonEqual("cue-settings/size/bad-size.vtt", "cue-settings/size/bad-size.json");
  });

  it("bogus-value.vtt", function(){
    assert.jsonEqual("cue-settings/size/bogus-value.vtt", "cue-settings/size/bad-size.json");
  });

  it("integer-value.vtt", function(){
    assert.jsonEqual("cue-settings/size/integer-value.vtt", "cue-settings/size/bad-size.json");
  });

  it("just-percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/size/just-percent-value.vtt", "cue-settings/size/bad-size.json");
  });

  it("negative-percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/size/negative-percent-value.vtt", "cue-settings/size/bad-size.json");
  });

  it("no-value.vtt", function(){
    assert.jsonEqual("cue-settings/size/no-value.vtt", "cue-settings/size/bad-size.json");
  });

  it("percent-before-value.vtt", function(){
    assert.jsonEqual("cue-settings/size/percent-before-value.vtt", "cue-settings/size/bad-size.json");
  });

  it("percent-over.vtt", function(){
    assert.jsonEqual("cue-settings/size/percent-over.vtt", "cue-settings/size/bad-size.json");
  });

  it("percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/size/percent-value.vtt", "cue-settings/size/percent-value.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/size/space-after-delimiter.vtt", "cue-settings/size/bad-size.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/size/space-before-delimiter.vtt", "cue-settings/size/bad-size.json");
  });

});
