var TestRunner = require("../../lib/test-runner.js"),
    test = new TestRunner();

describe("cue-times tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("fraction-digits.vtt", function(onDone){
    test.jsonEqualAll("cue-times/fraction-digits.vtt", "cue-times/fraction-digits.json", onDone);
  });

  it("fractions.vtt", function(onDone){
    test.jsonEqualAll("cue-times/fractions.vtt", "cue-times/fractions.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-times/incorrect-delimiter.vtt", "cue-times/incorrect-delimiter.json", onDone);
  });

  it("left-tab.vtt", function(onDone){
    test.jsonEqualAll("cue-times/left-tab.vtt", "cue-times/with-data.json", onDone);
  });

  it("max-spot-digits.vtt", function(onDone){
    test.jsonEqualAll("cue-times/max-spot-digits.vtt", "cue-times/max-spot-digits.json", onDone);
  });

  it("max-spots-over-sixty.vtt", function(onDone){
    test.jsonEqualAll("cue-times/max-spots-over-sixty.vtt", "cue-times/max-spots-over-sixty.json", onDone);
  });

  it("max-time-spots.vtt", function(onDone){
    test.jsonEqualAll("cue-times/max-time-spots.vtt", "cue-times/max-time-spots.json", onDone);
  });

  it("min-mid-digits.vtt", function(onDone){
    test.jsonEqualAll("cue-times/min-mid-digits.vtt", "cue-times/min-mid-digits.json", onDone);
  });

  it("min-top-digits.vtt", function(onDone){
    test.jsonEqualAll("cue-times/min-top-digits.vtt", "cue-times/min-top-digits.json", onDone);
  });

  it("minimum-spots-over-sixty.vtt", function(onDone){
    test.jsonEqualAll("cue-times/minimum-spots-over-sixty.vtt", "cue-times/minimum-spots-over-sixty.json", onDone);
  });

  it("minimum-time-spots.vtt", function(onDone){
    test.jsonEqualAll("cue-times/minimum-time-spots.vtt", "cue-times/minimum-time-spots.json", onDone);
  });

  it("mismatched-time-spots.vtt", function(onDone){
    test.jsonEqualAll("cue-times/mismatched-time-spots.vtt", "cue-times/mismatched-time-spots.json", onDone);
  });

  it("missing-separator.vtt", function(onDone){
    test.jsonEqualAll("cue-times/missing-separator.vtt", "cue-times/bad-data.json", onDone);
  });

  it("missing-spaces-between-separator.vtt", function(onDone){
    test.jsonEqualAll("cue-times/missing-spaces-between-separator.vtt", "cue-times/with-data.json", onDone);
  });

  it("separator-extra-space.vtt", function(onDone){
    test.jsonEqualAll("cue-times/separator-extra-space.vtt", "cue-times/with-data.json", onDone);
  });

  it("separator-tab.vtt", function(onDone){
    test.jsonEqualAll("cue-times/separator-tab.vtt", "cue-times/with-data.json", onDone);
  });

  it("space-left-tab-right.vtt", function(onDone){
    test.jsonEqualAll("cue-times/space-left-tab-right.vtt", "cue-times/with-data.json", onDone);
  });

  it("space-right-tab-left.vtt", function(onDone){
    test.jsonEqualAll("cue-times/space-right-tab-left.vtt", "cue-times/with-data.json", onDone);
  });

  it("spaces-tabs-on-both-sides.vtt", function(onDone){
    test.jsonEqualAll("cue-times/spaces-tabs-on-both-sides.vtt", "cue-times/with-data.json", onDone);
  });

  it("tab-right.vtt", function(onDone){
    test.jsonEqualAll("cue-times/tab-right.vtt", "cue-times/with-data.json", onDone);
  });

});
