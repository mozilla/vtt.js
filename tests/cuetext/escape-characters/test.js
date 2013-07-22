var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/escape-characters tests", function(){

  it("amp.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/amp.vtt", "cuetext/escape-characters/amp.json");
  });

  it("gt.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/gt.vtt", "cuetext/escape-characters/gt.json");
  });

  it("incorrect.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/incorrect.vtt", "cuetext/escape-characters/incorrect.json");
  });

  it("lrm.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/lrm.vtt", "cuetext/escape-characters/lrm.json");
  });

  it("lt.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/lt.vtt", "cuetext/escape-characters/lt.json");
  });

  it("nbsp.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/nbsp.vtt", "cuetext/escape-characters/nbsp.json");
  });

  it("rlm.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/rlm.vtt", "cuetext/escape-characters/rlm.json");
  });

  it("together.vtt", function(){
    assert.jsonEqual("cuetext/escape-characters/together.vtt", "cuetext/escape-characters/together.json");
  });

});
