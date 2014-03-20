var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/class tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("not-closed.vtt", function(onDone){
    test.jsonEqualAll("cuetext/class/not-closed.vtt", "cuetext/class/not-closed.json", onDone);
  });

  it("with-annotation.vtt", function(onDone){
    test.jsonEqualAll("cuetext/class/with-annotation.vtt", "cuetext/class/with-annotation.json", onDone);
  });

  it("with-closing-span.vtt", function(onDone){
    test.jsonEqualAll("cuetext/class/with-closing-span.vtt", "cuetext/class/with-closing-span.json", onDone);
  });

  it("with-subclass.vtt", function(onDone){
    test.jsonEqualAll("cuetext/class/with-subclass.vtt", "cuetext/class/with-subclass.json", onDone);
  });

  it("with-two-subclasses.vtt", function(onDone){
    test.jsonEqualAll("cuetext/class/with-two-subclasses.vtt", "cuetext/class/with-two-subclasses.json", onDone);
  });

});
