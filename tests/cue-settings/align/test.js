var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cue-settings/align tests", function(){

  it("bad-align.vtt", function(){
    assert.jsonEqual("cue-settings/align/bad-align.vtt", "cue-settings/align/bad-align.json");
  });

  it("bad-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/align/bad-delimiter.vtt", "cue-settings/align/bad-align.json");
  });

  it("bogus-value.vtt", function(){
    assert.jsonEqual("cue-settings/align/bogus-value.vtt", "cue-settings/align/bad-align.json");
  });

  it("capital-keyword.vtt", function(){
    assert.jsonEqual("cue-settings/align/capital-keyword.vtt", "cue-settings/align/bad-align.json");
  });

  it("keyword-end.vtt", function(){
    assert.jsonEqual("cue-settings/align/keyword-end.vtt", "cue-settings/align/keyword-end.json");
  });

  it("keyword-left.vtt", function(){
    assert.jsonEqual("cue-settings/align/keyword-left.vtt", "cue-settings/align/keyword-left.json");
  });

  it("keyword-middle.vtt", function(){
    assert.jsonEqual("cue-settings/align/keyword-middle.vtt", "cue-settings/align/keyword-middle.json");
  });

  it("keyword-right.vtt", function(){
    assert.jsonEqual("cue-settings/align/keyword-right.vtt", "cue-settings/align/keyword-right.json");
  });

  it("keyword-start.vtt", function(){
    assert.jsonEqual("cue-settings/align/keyword-start.vtt", "cue-settings/align/keyword-start.json");
  });

  it("no-value.vtt", function(){
    assert.jsonEqual("cue-settings/align/no-value.vtt", "cue-settings/align/bad-align.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/align/space-after-delimiter.vtt", "cue-settings/align/bad-align.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/align/space-before-delimiter.vtt", "cue-settings/align/bad-align.json");
  });

});
