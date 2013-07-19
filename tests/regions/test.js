var util = require("../../lib/util.js"),
    assert = util.assert;

describe("region tests", function(){

  it("bad-region.vtt", function(){
    assert.jsonEqual("regions/bad-region.vtt", "regions/bad-region.json");
  });

  it("incorrect-delimiter.vtt", function(){
    assert.jsonEqual("regions/incorrect-delimiter.vtt", "regions/bad-region.json");
  });

  it("line-break.vtt", function(){
    assert.jsonEqual("regions/line-break.vtt", "regions/bad-region.json");
  });

  it("no-line-break.vtt", function(){
    assert.jsonEqual("regions/no-line-break.vtt", "regions/good-region.json");
  });

  it("no-space-after-delimiter.vtt", function(){
    assert.jsonEqual("regions/no-space-after-delimiter.vtt", "regions/good-region.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("regions/space-before-delimiter.vtt", "regions/bad-region.json");
  });

});
