var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("regions/width tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("correct.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/correct.vtt", "regions/width/correct.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/incorrect-delimiter.vtt", "regions/width/bad-width.json", onDone);
  });

  it("letter-in-value.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/letter-in-value.vtt", "regions/width/bad-width.json", onDone);
  });

  it("negative-percent.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/negative-percent.vtt", "regions/width/bad-width.json", onDone);
  });

  it("no-percentage.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/no-percentage.vtt", "regions/width/bad-width.json", onDone);
  });

  it("percent-over.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/percent-over.vtt", "regions/width/bad-width.json", onDone);
  });

  it("percentage-at-front.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/percentage-at-front.vtt", "regions/width/bad-width.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/space-after-delimiter.vtt", "regions/width/bad-width.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/space-before-delimiter.vtt", "regions/width/bad-width.json", onDone);
  });

  it("two-periods.vtt", function(onDone){
    test.jsonEqualParsing("regions/width/two-periods.vtt", "regions/width/bad-width.json", onDone);
  });

});
