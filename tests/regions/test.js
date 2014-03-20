var TestRunner = require("../test-runner.js"),
    test = new TestRunner();

describe("region tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bad-region.vtt", function(onDone){
    test.jsonEqualParsing("regions/bad-region.vtt", "regions/bad-region.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/incorrect-delimiter.vtt", "regions/bad-region.json", onDone);
  });

  it("line-break.vtt", function(onDone){
    test.jsonEqualParsing("regions/line-break.vtt", "regions/bad-region.json", onDone);
  });

  it("no-line-break.vtt", function(onDone){
    test.jsonEqualParsing("regions/no-line-break.vtt", "regions/good-region.json", onDone);
  });

  it("no-space-after-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/no-space-after-delimiter.vtt", "regions/good-region.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualParsing("regions/space-before-delimiter.vtt", "regions/bad-region.json", onDone);
  });

});
