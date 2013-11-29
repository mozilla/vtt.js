var TestRunner = require("../../lib/test-runner.js"),
    test = new TestRunner();

describe("integration tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("arrows.vtt", function(onDone){
    test.jsonEqualAll("integration/arrows.vtt", "integration/arrows.json", onDone);
  });

  it("cue-content-class.vtt", function(onDone){
    test.jsonEqualAll("integration/cue-content-class.vtt", "integration/cue-content-class.json", onDone);
  });

  it("cue-content.vtt", function(onDone){
    test.jsonEqualAll("integration/cue-content.vtt", "integration/cue-content.json", onDone);
  });

  it("cue-identifier.vtt", function(onDone){
    test.jsonEqualAll("integration/cue-identifier.vtt", "integration/cue-identifier.json", onDone);
  });

  it.skip("cycle-collector-talk.vtt", function(onDone){
    test.jsonEqualAll("integration/cycle-collector-talk.vtt", "integration/cycle-collector-talk.json", onDone);
  });

  it("id.vtt", function(onDone){
    test.jsonEqualAll("integration/id.vtt", "integration/id.json", onDone);
  });

  it("not-only-nested-cues.vtt", function(onDone){
    test.jsonEqualAll("integration/not-only-nested-cues.vtt", "integration/not-only-nested-cues.json", onDone);
  });

  it("one-line-comment.vtt", function(onDone){
    test.jsonEqualAll("integration/one-line-comment.vtt", "integration/one-line-comment.json", onDone);
  });

  it("only-nested-cues.vtt", function(onDone){
    test.jsonEqualAll("integration/only-nested-cues.vtt", "integration/only-nested-cues.json", onDone);
  });

  it("regions.vtt", function(onDone){
    test.jsonEqualAll("integration/regions.vtt", "integration/regions.json", onDone);
  });

  it.skip("spec-example.vtt", function(onDone){
    test.jsonEqualAll("integration/spec-example.vtt", "integration/spec-example.json", onDone);
  });

});
