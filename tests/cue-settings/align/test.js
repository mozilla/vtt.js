var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cue-settings/align tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bad-align.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/bad-align.vtt", "cue-settings/align/bad-align.json", onDone);
  });

  it("bad-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/bad-delimiter.vtt", "cue-settings/align/bad-align.json", onDone);
  });

  it("bogus-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/bogus-value.vtt", "cue-settings/align/bad-align.json", onDone);
  });

  it("capital-keyword.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/capital-keyword.vtt", "cue-settings/align/bad-align.json", onDone);
  });

  it("keyword-end.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/keyword-end.vtt", "cue-settings/align/keyword-end.json", onDone);
  });

  it("keyword-left.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/keyword-left.vtt", "cue-settings/align/keyword-left.json", onDone);
  });

  it("keyword-middle.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/keyword-middle.vtt", "cue-settings/align/keyword-middle.json", onDone);
  });

  it("keyword-right.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/keyword-right.vtt", "cue-settings/align/keyword-right.json", onDone);
  });

  it("keyword-start.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/keyword-start.vtt", "cue-settings/align/keyword-start.json", onDone);
  });

  it("no-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/no-value.vtt", "cue-settings/align/bad-align.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/space-after-delimiter.vtt", "cue-settings/align/bad-align.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/align/space-before-delimiter.vtt", "cue-settings/align/bad-align.json", onDone);
  });

});
