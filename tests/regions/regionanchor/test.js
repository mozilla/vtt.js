var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("regions/regionanchor tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("correct.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/correct.vtt", "regions/regionanchor/correct.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/incorrect-delimiter.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("letter-in-value.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/letter-in-value.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("negative-percent.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/negative-percent.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("no-comma.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/no-comma.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("no-percent.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/no-percent.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("percent-at-front.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/percent-at-front.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("percent-over.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/percent-over.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/space-after-delimiter.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/space-before-delimiter.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

  it("two-periods.vtt", function(onDone){
    test.jsonEqualParsing("regions/regionanchor/two-periods.vtt", "regions/regionanchor/bad-regionanchor.json", onDone);
  });

});
