var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("regions/lines tests", function(){

  it("correct.vtt", function(){
    assert.jsonEqual("regions/lines/correct.vtt", "regions/lines/correct.json");
  });

  it("decimal-value.vtt", function(){
    assert.jsonEqual("regions/lines/decimal-value.vtt", "regions/lines/bad-line.json");
  });

  it("incorrect-delimiter.vtt", function(){
    assert.jsonEqual("regions/lines/incorrect-delimiter.vtt", "regions/lines/bad-line.json");
  });

  it("letter-in-value.vtt", function(){
    assert.jsonEqual("regions/lines/letter-in-value.vtt", "regions/lines/bad-line.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("regions/lines/space-after-delimiter.vtt", "regions/lines/bad-line.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("regions/lines/space-before-delimiter.vtt", "regions/lines/bad-line.json");
  });

});
