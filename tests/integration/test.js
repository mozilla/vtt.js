var util = require("../../lib/util.js"),
    assert = util.assert;

describe("integration tests", function(){

  it("cue-content-class.vtt", function(){
    assert.jsonEqual("integration/cue-content-class.vtt", "integration/cue-content-class.json");
  });

  it("cue-content.vtt", function(){
    assert.jsonEqual("integration/cue-content.vtt", "integration/cue-content.json");
  });

  it("not-only-nested-cues.vtt", function(){
    assert.jsonEqual("integration/not-only-nested-cues.vtt", "integration/not-only-nested-cues.json");
  });

  it("one-line-comment.vtt", function(){
    assert.jsonEqual("integration/one-line-comment.vtt", "integration/one-line-comment.json");
  });

  it("only-nested-cues.vtt", function(){
    assert.jsonEqual("integration/only-nested-cues.vtt", "integration/only-nested-cues.json");
  });

  it("spec-example.vtt", function(){
    assert.jsonEqual("integration/spec-example.vtt", "integration/spec-example.json");
  });

});
