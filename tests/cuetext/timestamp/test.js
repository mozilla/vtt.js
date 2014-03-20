var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/timestamp tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("basic.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/timestamp/basic.vtt", "cuetext/timestamp/basic.json", onDone);
  });

  it("nested.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/timestamp/nested.vtt", "cuetext/timestamp/nested.json", onDone);
  });

  it("no-end-gt.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/timestamp/no-end-gt.vtt", "cuetext/timestamp/no-end-gt.json", onDone);
  });

  it("non-digit.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/timestamp/non-digit.vtt", "cuetext/timestamp/non-digit.json", onDone);
  });

  it("out-of-cue-range.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/timestamp/out-of-cue-range.vtt", "cuetext/timestamp/out-of-cue-range.json", onDone);
  });

  it("space-after-lt.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/timestamp/space-after-lt.vtt", "cuetext/timestamp/space-after-lt.json", onDone);
  });

  it("space-before-gt.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/timestamp/space-before-gt.vtt", "cuetext/timestamp/space-before-gt.json", onDone);
  });
});
