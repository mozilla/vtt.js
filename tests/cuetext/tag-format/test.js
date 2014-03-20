var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/tag-format tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bogus-span-name.vtt", function(onDone){
    test.jsonEqualAll("cuetext/tag-format/bogus-span-name.vtt", "cuetext/tag-format/bogus-span-name.json", onDone);
  });

  it("end-tag-no-gt.vtt", function(onDone){
    test.jsonEqualAll("cuetext/tag-format/end-tag-no-gt.vtt", "cuetext/tag-format/end-tag-no-gt.json", onDone);
  });

  it("incorrect-close-tag-order.vtt", function(onDone){
    test.jsonEqualAll("cuetext/tag-format/incorrect-close-tag-order.vtt", "cuetext/tag-format/incorrect-close-tag-order.json", onDone);
  });

  it("no-closing-gt", function(onDone){
    test.jsonEqualAll("cuetext/tag-format/no-closing-gt.vtt", "cuetext/tag-format/no-closing-gt.json", onDone);
  });

  it("no-start-tag.vtt", function(onDone){
    test.jsonEqualAll("cuetext/tag-format/no-start-tag.vtt", "cuetext/tag-format/no-start-tag.json", onDone);
  });

  it("start-tag-missing-gt.vtt", function(onDone){
    test.jsonEqualAll("cuetext/tag-format/start-tag-missing-gt.vtt", "cuetext/tag-format/start-tag-missing-gt.json", onDone);
  });

});
