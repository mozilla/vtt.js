var util = require("../../lib/util.js"),
    assert = util.assert;

describe("integration tests", function(){

  it("arrows.vtt", function(){
    assert.jsonEqual("integration/arrows.vtt", "integration/arrows.json");
  });

  it("cue-content-class.vtt", function(){
    assert.jsonEqual("integration/cue-content-class.vtt", "integration/cue-content-class.json");
  });

  it("cue-content.vtt", function(){
    assert.jsonEqual("integration/cue-content.vtt", "integration/cue-content.json");
  });

  it("cue-identifier.vtt", function(){
    assert.jsonEqual("integration/cue-identifier.vtt", "integration/cue-identifier.json");
  });

  it("cycle-collector-talk.vtt", function(){
    assert.jsonEqual("integration/cycle-collector-talk.vtt", "integration/cycle-collector-talk.json");
  });

  it("id.vtt", function(){
    assert.jsonEqual("integration/id.vtt", "integration/id.json");
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

  it("regions.vtt", function(){
    assert.jsonEqual("integration/regions.vtt", "integration/regions.json");
  });

  it("spec-example.vtt", function(){
    assert.jsonEqualUTF8("integration/spec-example.vtt", "integration/spec-example.json");
  });

});
