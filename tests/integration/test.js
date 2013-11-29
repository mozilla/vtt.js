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
    test.jsonEqual("integration/arrows.vtt", "integration/arrows.json", onDone);
  });

  it("cue-content-class.vtt", function(onDone){
    test.jsonEqual("integration/cue-content-class.vtt", "integration/cue-content-class.json", onDone);
  });

  it("cue-content.vtt", function(onDone){
    test.jsonEqual("integration/cue-content.vtt", "integration/cue-content.json", onDone);
  });

  it("cue-identifier.vtt", function(onDone){
    test.jsonEqual("integration/cue-identifier.vtt", "integration/cue-identifier.json", onDone);
  });

  it("cycle-collector-talk.vtt", function(onDone){
    test.jsonEqual("integration/cycle-collector-talk.vtt", "integration/cycle-collector-talk.json", onDone);
  });

  it("id.vtt", function(onDone){
    test.jsonEqual("integration/id.vtt", "integration/id.json", onDone);
  });

  it("not-only-nested-cues.vtt", function(onDone){
    test.jsonEqual("integration/not-only-nested-cues.vtt", "integration/not-only-nested-cues.json", onDone);
  });

  it("one-line-comment.vtt", function(onDone){
    test.jsonEqual("integration/one-line-comment.vtt", "integration/one-line-comment.json", onDone);
  });

  it("only-nested-cues.vtt", function(onDone){
    test.jsonEqual("integration/only-nested-cues.vtt", "integration/only-nested-cues.json", onDone);
  });

  it("regions.vtt", function(onDone){
    test.jsonEqual("integration/regions.vtt", "integration/regions.json", onDone);
  });

  it("spec-example.vtt", function(onDone){
    test.jsonEqual("integration/spec-example.vtt", "integration/spec-example.json", onDone);
  });

});
