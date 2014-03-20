var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/italic tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("not-closed.vtt", function(onDone){
    test.jsonEqualAll("cuetext/italic/not-closed.vtt", "cuetext/italic/not-closed.json", onDone);
  });

  it("with-annotation.vtt", function(onDone){
    test.jsonEqualAll("cuetext/italic/with-annotation.vtt", "cuetext/italic/with-annotation.json", onDone);
  });

  it("with-closing-span.vtt", function(onDone){
    test.jsonEqualAll("cuetext/italic/with-closing-span.vtt", "cuetext/italic/with-closing-span.json", onDone);
  });

  it("with-subclass.vtt", function(onDone){
    test.jsonEqualAll("cuetext/italic/with-subclass.vtt", "cuetext/italic/with-subclass.json", onDone);
  });

  it("with-two-subclasses.vtt", function(onDone){
    test.jsonEqualAll("cuetext/italic/with-two-subclasses.vtt", "cuetext/italic/with-two-subclasses.json", onDone);
  });

});
