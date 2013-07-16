var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/tag-format tests", function(){

  it("bogus-span-name.vtt", function(){
    assert.jsonEqual("cuetext/tag-format/bogus-span-name.vtt", "cuetext/tag-format/bogus-span-name.json");
  });

  it.skip("end-tag-no-gt.vtt", function(){
    assert.jsonEqual("cuetext/tag-format/end-tag-no-gt.vtt");
  });

  it("incorrect-close-tag-order.vtt", function(){
    assert.jsonEqual("cuetext/tag-format/incorrect-close-tag-order.vtt", "cuetext/tag-format/incorrect-close-tag-order.json");
  });

  it.skip("no-closing-gt", function(){
    assert.jsonEqual("cuetext/tag-format/no-closing-gt");
  });

  it("no-start-tag.vtt", function(){
    assert.jsonEqual("cuetext/tag-format/no-start-tag.vtt", "cuetext/tag-format/no-start-tag.json");
  });

  it("start-tag-missing-gt.vtt", function(){
    assert.jsonEqual("cuetext/tag-format/start-tag-missing-gt.vtt", "cuetext/tag-format/start-tag-missing-gt.json");
  });

});
