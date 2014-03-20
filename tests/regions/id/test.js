var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("regions/id tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("arrows.vtt", function(onDone){
    test.jsonEqualParsing("regions/id/arrows.vtt", "regions/id/arrows.json", onDone);
  });

  it("bad-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/id/bad-delimiter.vtt", "regions/id/bad-id.json", onDone);
  });

  it("correct.vtt", function(onDone){
    test.jsonEqualParsing("regions/id/correct.vtt", "regions/id/correct.json", onDone);
  });

  it("no-value.vtt", function(onDone){
    test.jsonEqualParsing("regions/id/no-value.vtt", "regions/id/bad-id.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/id/space-after-delimiter.vtt", "regions/id/bad-id.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/id/space-before-delimiter.vtt", "regions/id/bad-id.json", onDone);
  });

});
