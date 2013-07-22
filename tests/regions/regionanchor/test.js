var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("regions/regionanchor tests", function(){

  it("correct.vtt", function(){
    assert.jsonEqual("regions/regionanchor/correct.vtt", "regions/regionanchor/correct.json");
  });

  it("incorrect-delimiter.vtt", function(){
    assert.jsonEqual("regions/regionanchor/incorrect-delimiter.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("letter-in-value.vtt", function(){
    assert.jsonEqual("regions/regionanchor/letter-in-value.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("negative-percent.vtt", function(){
    assert.jsonEqual("regions/regionanchor/negative-percent.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("no-comma.vtt", function(){
    assert.jsonEqual("regions/regionanchor/no-comma.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("no-percent.vtt", function(){
    assert.jsonEqual("regions/regionanchor/no-percent.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("percent-at-front.vtt", function(){
    assert.jsonEqual("regions/regionanchor/percent-at-front.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("percent-over.vtt", function(){
    assert.jsonEqual("regions/regionanchor/percent-over.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("regions/regionanchor/space-after-delimiter.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("regions/regionanchor/space-before-delimiter.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

  it("two-periods.vtt", function(){
    assert.jsonEqual("regions/regionanchor/two-periods.vtt", "regions/regionanchor/bad-regionanchor.json");
  });

});
