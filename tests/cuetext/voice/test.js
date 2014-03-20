var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/voice tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("no-end-gt.vtt", function(onDone){
    test.jsonEqualAll("cuetext/voice/no-end-gt.vtt", "cuetext/voice/no-end-gt.json", onDone);
  });

  it("not-closed.vtt", function(onDone){
    test.jsonEqualAll("cuetext/voice/not-closed.vtt", "cuetext/voice/not-closed.json", onDone);
  });

  it("with-annotation.vtt", function(onDone){
    test.jsonEqualAll("cuetext/voice/with-annotation.vtt", "cuetext/voice/with-annotation.json", onDone);
  });

  it("with-closing-span.vtt", function(onDone){
    test.jsonEqualAll("cuetext/voice/with-closing-span.vtt", "cuetext/voice/with-closing-span.json", onDone);
  });

  it("with-subclass.vtt", function(onDone){
    test.jsonEqualAll("cuetext/voice/with-subclass.vtt", "cuetext/voice/with-subclass.json", onDone);
  });

  it("with-two-subclasses.vtt", function(onDone){
    test.jsonEqualAll("cuetext/voice/with-two-subclasses.vtt", "cuetext/voice/with-two-subclasses.json", onDone);
  });

});
