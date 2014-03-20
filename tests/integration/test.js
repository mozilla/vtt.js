var TestRunner = require("../test-runner.js"),
    test = new TestRunner();

describe("integration tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("arrows.vtt", function(onDone){
    test.jsonEqualAllNoStream("integration/arrows.vtt", "integration/arrows.json", onDone);
  });

  it("cue-content-class.vtt", function(onDone){
    test.jsonEqualAllNoStream("integration/cue-content-class.vtt", "integration/cue-content-class.json", onDone);
  });

  it("cue-content.vtt", function(onDone){
    test.jsonEqualAllNoStream("integration/cue-content.vtt", "integration/cue-content.json", onDone);
  });

  it("cue-identifier.vtt", function(onDone){
    test.jsonEqualAllNoStream("integration/cue-identifier.vtt", "integration/cue-identifier.json", onDone);
  });

  // Turn back on: https://github.com/mozilla/vtt.js/issues/262
  it("cycle-collector-talk.vtt", function(onDone){
    test.jsonEqual("integration/cycle-collector-talk.vtt", "integration/cycle-collector-talk.json", onDone);
  });

  // Turn back on: https://github.com/mozilla/vtt.js/issues/262
  it("id.vtt", function(onDone){
    test.jsonEqual("integration/id.vtt", "integration/id.json", onDone);
  });

  // Turn back on: https://github.com/mozilla/vtt.js/issues/262
  it("not-only-nested-cues.vtt", function(onDone){
    test.jsonEqual("integration/not-only-nested-cues.vtt", "integration/not-only-nested-cues.json", onDone);
  });

  // Turn back on: https://github.com/mozilla/vtt.js/issues/262
  it("one-line-comment.vtt", function(onDone){
    test.jsonEqual("integration/one-line-comment.vtt", "integration/one-line-comment.json", onDone);
  });

  // Turn back on: https://github.com/mozilla/vtt.js/issues/262
  it("only-nested-cues.vtt", function(onDone){
    test.jsonEqual("integration/only-nested-cues.vtt", "integration/only-nested-cues.json", onDone);
  });

  // Turn back on: https://github.com/mozilla/vtt.js/issues/262
  it("regions.vtt", function(onDone){
    test.jsonEqual("integration/regions.vtt", "integration/regions.json", onDone);
  });

  // Turn back on: https://github.com/mozilla/vtt.js/issues/262
  it("spec-example.vtt", function(onDone){
    test.jsonEqual("integration/spec-example.vtt", "integration/spec-example.json", onDone);
  });

});
