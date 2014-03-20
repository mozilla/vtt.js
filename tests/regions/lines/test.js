var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("regions/lines tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("correct.vtt", function(onDone){
    test.jsonEqualParsing("regions/lines/correct.vtt", "regions/lines/correct.json", onDone);
  });

  it("decimal-value.vtt", function(onDone){
    test.jsonEqualParsing("regions/lines/decimal-value.vtt", "regions/lines/bad-line.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/lines/incorrect-delimiter.vtt", "regions/lines/bad-line.json", onDone);
  });

  it("letter-in-value.vtt", function(onDone){
    test.jsonEqualParsing("regions/lines/letter-in-value.vtt", "regions/lines/bad-line.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/lines/space-after-delimiter.vtt", "regions/lines/bad-line.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/lines/space-before-delimiter.vtt", "regions/lines/bad-line.json", onDone);
  });

});
