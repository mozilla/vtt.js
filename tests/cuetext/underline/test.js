var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/underline tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("not-closed.vtt", function(onDone){
    test.jsonEqualAll("cuetext/underline/not-closed.vtt", "cuetext/underline/not-closed.json", onDone);
  });

  it("with-annotation.vtt", function(onDone){
    test.jsonEqualAll("cuetext/underline/with-annotation.vtt", "cuetext/underline/with-annotation.json", onDone);
  });

  it("with-closing-span.vtt", function(onDone){
    test.jsonEqualAll("cuetext/underline/with-closing-span.vtt", "cuetext/underline/with-closing-span.json", onDone);
  });

  it("with-subclass.vtt", function(onDone){
    test.jsonEqualAll("cuetext/underline/with-subclass.vtt", "cuetext/underline/with-subclass.json", onDone);
  });

  it("with-two-subclasses.vtt", function(onDone){
    test.jsonEqualAll("cuetext/underline/with-two-subclasses.vtt", "cuetext/underline/with-two-subclasses.json", onDone);
  });

});
