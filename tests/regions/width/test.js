var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("regions/width tests", function(){

  it.skip("correct.vtt", function(){
    assert.jsonEqual("regions/width/correct.vtt", "regions/width/correct.json");
  });

  it("incorrect-delimiter.vtt", function(){
    assert.jsonEqual("regions/width/incorrect-delimiter.vtt", "regions/width/bad-width.json");
  });

  it("letter-in-value.vtt", function(){
    assert.jsonEqual("regions/width/letter-in-value.vtt", "regions/width/bad-width.json");
  });

  it("negative-percent.vtt", function(){
    assert.jsonEqual("regions/width/negative-percent.vtt", "regions/width/bad-width.json");
  });

  it("no-percentage.vtt", function(){
    assert.jsonEqual("regions/width/no-percentage.vtt", "regions/width/bad-width.json");
  });

  it("percent-over.vtt", function(){
    assert.jsonEqual("regions/width/percent-over.vtt", "regions/width/bad-width.json");
  });

  it("percentage-at-front.vtt", function(){
    assert.jsonEqual("regions/width/percentage-at-front.vtt", "regions/width/bad-width.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("regions/width/space-after-delimiter.vtt", "regions/width/bad-width.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("regions/width/space-before-delimiter.vtt", "regions/width/bad-width.json");
  });

  it("two-periods.vtt", function(){
    assert.jsonEqual("regions/width/two-periods.vtt", "regions/width/bad-width.json");
  });

});
