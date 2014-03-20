var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/format tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("double-line-break.vtt", function(onDone){
    test.jsonEqualAll("cuetext/format/double-line-break.vtt", "cuetext/format/double-line-break.json", onDone);
  });

  it("line-breaks.vtt", function(onDone){
    test.jsonEqualAll("cuetext/format/line-breaks.vtt", "cuetext/format/line-breaks.json", onDone);
  });

  it("long-line.vtt", function(onDone){
    test.jsonEqualAllNoStream("cuetext/format/long-line.vtt", "cuetext/format/long-line.json", onDone);
  });

  it("no-line-break.vtt", function(onDone){
    test.jsonEqualAll("cuetext/format/no-line-break.vtt", "cuetext/format/no-line-break.json", onDone);
  });

  it("no-newline-at-end.vtt", function(onDone){
    test.jsonEqualAll("cuetext/format/no-newline-at-end.vtt", "cuetext/format/no-newline-at-end.json", onDone);
  });

});
