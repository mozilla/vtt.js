var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cue-settings/region tests", function(){

  it("bad-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/region/bad-delimiter.vtt", "cue-settings/region/bad-region.json");
  });

  it("bad-region.vtt", function(){
    assert.jsonEqual("cue-settings/region/bad-region.vtt", "cue-settings/region/bad-region.json");
  });

  it("no-value.vtt", function(){
    assert.jsonEqual("cue-settings/region/no-value.vtt", "cue-settings/region/bad-region.json");
  });

  it.skip("region-arrows.vtt", function(){
    assert.jsonEqual("cue-settings/region/region-arrows.vtt", "cue-settings/region/bad-region.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/region/space-after-delimiter.vtt", "cue-settings/region/bad-region.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/region/space-before-delimiter.vtt", "cue-settings/region/bad-region.json");
  });

  it("valid.vtt", function(){
    assert.jsonEqual("cue-settings/region/valid.vtt", "cue-settings/region/valid.json");
  });

});
