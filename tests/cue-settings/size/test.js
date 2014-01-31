var TestRunner = require("../../../lib/test-runner.js"),
    test = new TestRunner();

describe("cue-settings/size tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bad-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/bad-delimiter.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("bad-size.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/bad-size.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("bogus-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/bogus-value.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("decimal-percent.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/decimal-percent.vtt", "cue-settings/size/decimal-percent.json", onDone);
  });

  it("integer-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/integer-value.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("just-percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/just-percent-value.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("negative-percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/negative-percent-value.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("no-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/no-value.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("percent-before-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/percent-before-value.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("percent-over.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/percent-over.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/percent-value.vtt", "cue-settings/size/percent-value.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/space-after-delimiter.vtt", "cue-settings/size/bad-size.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/size/space-before-delimiter.vtt", "cue-settings/size/bad-size.json", onDone);
  });

});
