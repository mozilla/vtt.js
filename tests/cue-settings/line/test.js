var TestRunner = require("../../../lib/test-runner.js"),
    test = new TestRunner();

describe("cue-settings/line tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bad-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/bad-delimiter.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("bad-line.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/bad-line.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("bogus-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/bogus-value.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("dash-in-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/dash-in-value.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("integer-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/integer-value.vtt", "cue-settings/line/integer-value.json", onDone);
  });

  it("large-integer-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/large-integer-value.vtt", "cue-settings/line/large-integer-value.json", onDone);
  });

  it("negative-integer-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/negative-integer-value.vtt", "cue-settings/line/negative-integer-value.json", onDone);
  });

  it("negative-percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/negative-percent-value.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("negative-zeros.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/negative-zeros.vtt", "cue-settings/line/negative-zeros.json", onDone);
  });

  it("no-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/no-value.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("percent-in-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/percent-in-value.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("percent-over.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/percent-over.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("percent-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/percent-value.vtt", "cue-settings/line/percent-value.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/space-after-delimiter.vtt", "cue-settings/line/bad-line.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/line/space-before-delimiter.vtt", "cue-settings/line/bad-line.json", onDone);
  });

});
