var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/escape-characters tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("amp.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/amp.vtt", "cuetext/escape-characters/amp.json", onDone);
  });

  it("gt.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/gt.vtt", "cuetext/escape-characters/gt.json", onDone);
  });

  it("incorrect.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/incorrect.vtt", "cuetext/escape-characters/incorrect.json", onDone);
  });

  it("lrm.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/lrm.vtt", "cuetext/escape-characters/lrm.json", onDone);
  });

  it("lt.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/lt.vtt", "cuetext/escape-characters/lt.json", onDone);
  });

  it("nbsp.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/nbsp.vtt", "cuetext/escape-characters/nbsp.json", onDone);
  });

  it("rlm.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/rlm.vtt", "cuetext/escape-characters/rlm.json", onDone);
  });

  it("together.vtt", function(onDone){
    test.jsonEqualAll("cuetext/escape-characters/together.vtt", "cuetext/escape-characters/together.json", onDone);
  });

});
