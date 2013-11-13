var TestRunner = require("../../../lib/test-runner.js"),
    test = new TestRunner();

describe("cue-settings/position tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bad-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/bad-delimiter.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("bad-position.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/bad-position.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("bad-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/bad-value.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("bogus-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/bogus-value.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("integer-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/integer-value.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("just-percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/just-percent-value.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("negative-percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/negative-percent-value.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("percent-over.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/percent-over.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/percent-value.vtt", "cue-settings/position/percent-value.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/space-after-delimiter.vtt", "cue-settings/position/bad-position.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/position/space-before-delimiter.vtt", "cue-settings/position/bad-position.json", onDone);
  });

});
