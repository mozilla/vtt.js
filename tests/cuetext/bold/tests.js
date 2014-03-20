var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/bold tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("not-closed.vtt", function(onDone){
    test.jsonEqualAll("cuetext/bold/not-closed.vtt", "cuetext/bold/not-closed.json", onDone);
  });

  it("with-annotation.vtt", function(onDone){
    test.jsonEqualAll("cuetext/bold/with-annotation.vtt", "cuetext/bold/with-annotation.json", onDone);
  });

  it("with-closing-span.vtt", function(onDone){
    test.jsonEqualAll("cuetext/bold/with-closing-span.vtt", "cuetext/bold/with-closing-span.json", onDone);
  });

  it("with-subclass.vtt", function(onDone){
    test.jsonEqualAll("cuetext/bold/with-subclass.vtt", "cuetext/bold/with-subclass.json", onDone);
  });

  it("with-two-subclasses.vtt", function(onDone){
    test.jsonEqualAll("cuetext/bold/with-two-subclasses.vtt", "cuetext/bold/with-two-subclasses.json", onDone);
  });

});
