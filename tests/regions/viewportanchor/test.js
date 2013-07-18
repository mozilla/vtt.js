var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("regions/viewportanchor tests", function(){

  it("correct.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/correct.vtt", "regions/viewportanchor/correct.json");
  });

  it("incorrect-delimiter.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/incorrect-delimiter.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("letter-in-value.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/letter-in-value.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("negative-percent.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/negative-percent.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("no-comma.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/no-comma.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("no-percent.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/no-percent.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("percent-at-front.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/percent-at-front.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("percent-over.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/percent-over.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/space-after-delimiter.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/space-before-delimiter.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

  it("two-periods.vtt", function(){
    assert.jsonEqual("regions/viewportanchor/two-periods.vtt", "regions/viewportanchor/bad-viewportanchor.json");
  });

});
