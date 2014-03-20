var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/lang tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("no-end-gt.vtt", function(onDone){
    test.jsonEqualAll("cuetext/lang/no-end-gt.vtt", "cuetext/lang/no-end-gt.json", onDone);
  });

  it("not-closed.vtt", function(onDone){
    test.jsonEqualAll("cuetext/lang/not-closed.vtt", "cuetext/lang/not-closed.json", onDone);
  });

  it("with-annotation.vtt", function(onDone){
    test.jsonEqualAll("cuetext/lang/with-annotation.vtt", "cuetext/lang/with-annotation.json", onDone);
  });

  it("with-closing-span.vtt", function(onDone){
    test.jsonEqualAll("cuetext/lang/with-closing-span.vtt", "cuetext/lang/with-closing-span.json", onDone);
  });

  it("with-no-annotation.vtt", function(onDone){
    test.jsonEqualAll("cuetext/lang/with-no-annotation.vtt", "cuetext/lang/with-no-annotation.json", onDone);
  });

  it("with-subclass.vtt", function(onDone){
    test.jsonEqualAll("cuetext/lang/with-subclass.vtt", "cuetext/lang/with-subclass.json", onDone);
  });

  it("with-two-subclasses.vtt", function(onDone){
    test.jsonEqualAll("cuetext/lang/with-two-subclasses.vtt", "cuetext/lang/with-two-subclasses.json", onDone);
  });

});
