var TestRunner = require("../../../lib/test-runner.js"),
    test = new TestRunner();

describe("regions/scroll tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bogus-value.vtt", function(onDone){
    test.jsonEqualAll("regions/scroll/bogus-value.vtt", "regions/scroll/bad-scroll.json", onDone);
  });

  it("correct.vtt", function(onDone){
    test.jsonEqualAll("regions/scroll/correct.vtt", "regions/scroll/correct.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualAll("regions/scroll/incorrect-delimiter.vtt", "regions/scroll/bad-scroll.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualAll("regions/scroll/space-after-delimiter.vtt", "regions/scroll/bad-scroll.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualAll("regions/scroll/space-before-delimiter.vtt", "regions/scroll/bad-scroll.json", onDone);
  });

});
