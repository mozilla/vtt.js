var TestRunner = require("../../../lib/test-runner.js"),
    test = new TestRunner();

describe("cue-settings/region tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bad-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/region/bad-delimiter.vtt", "cue-settings/region/bad-region.json", onDone);
  });

  it("bad-region.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/region/bad-region.vtt", "cue-settings/region/bad-region.json", onDone);
  });

  it("no-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/region/no-value.vtt", "cue-settings/region/bad-region.json", onDone);
  });

  it("region-arrows.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/region/region-arrows.vtt", "cue-settings/region/bad-region.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/region/space-after-delimiter.vtt", "cue-settings/region/bad-region.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/region/space-before-delimiter.vtt", "cue-settings/region/bad-region.json", onDone);
  });

  it("valid.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/region/valid.vtt", "cue-settings/region/valid.json", onDone);
  });

});
