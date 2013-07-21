var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("regions/id tests", function(){

  it("arrows.vtt", function(){
    assert.jsonEqual("regions/id/arrows.vtt", "regions/id/bad-id.json");
  });

  it("bad-delimiter.vtt", function(){
    assert.jsonEqual("regions/id/bad-delimiter.vtt", "regions/id/bad-id.json");
  });

  it("correct.vtt", function(){
    assert.jsonEqual("regions/id/correct.vtt", "regions/id/correct.json");
  });

  it("no-value.vtt", function(){
    assert.jsonEqual("regions/id/no-value.vtt", "regions/id/bad-id.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("regions/id/space-after-delimiter.vtt", "regions/id/bad-id.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("regions/id/space-before-delimiter.vtt", "regions/id/bad-id.json");
  });

});
