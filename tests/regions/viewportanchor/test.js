var TestRunner = require("../../../lib/test-runner.js"),
    test = new TestRunner();

describe("regions/viewportanchor tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("correct.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/correct.vtt", "regions/viewportanchor/correct.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/incorrect-delimiter.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("letter-in-value.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/letter-in-value.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("negative-percent.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/negative-percent.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("no-comma.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/no-comma.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("no-percent.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/no-percent.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("percent-at-front.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/percent-at-front.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("percent-over.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/percent-over.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/space-after-delimiter.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/space-before-delimiter.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

  it("two-periods.vtt", function(onDone){
    test.jsonEqualParsing("regions/viewportanchor/two-periods.vtt", "regions/viewportanchor/bad-viewportanchor.json", onDone);
  });

});
