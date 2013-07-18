var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("regions/scroll tests", function(){

  it("bogus-value.vtt", function(){
    assert.jsonEqual("regions/scroll/bogus-value.vtt", "regions/scroll/bad-scroll.json");
  });

  it("correct.vtt", function(){
    assert.jsonEqual("regions/scroll/correct.vtt", "regions/scroll/correct.json");
  });

  it("incorrect-delimiter.vtt", function(){
    assert.jsonEqual("regions/scroll/incorrect-delimiter.vtt", "regions/scroll/bad-scroll.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("regions/scroll/space-after-delimiter.vtt", "regions/scroll/bad-scroll.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("regions/scroll/space-before-delimiter.vtt", "regions/scroll/bad-scroll.json");
  });

});
