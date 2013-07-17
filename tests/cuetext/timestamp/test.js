var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/timestamp tests", function(){

  it("basic.vtt", function(){
    assert.jsonEqual("cuetext/timestamp/basic.vtt", "cuetext/timestamp/basic.json");
  });

  it("nested.vtt", function(){
    assert.jsonEqual("cuetext/timestamp/nested.vtt", "cuetext/timestamp/nested.json");
  });

  it("no-end-gt.vtt", function(){
    assert.jsonEqual("cuetext/timestamp/no-end-gt.vtt", "cuetext/timestamp/no-end-gt.json");
  });

  it("non-digit.vtt", function(){
    assert.jsonEqual("cuetext/timestamp/non-digit.vtt", "cuetext/timestamp/non-digit.json");
  });

  it("out-of-cue-range.vtt", function(){
    assert.jsonEqual("cuetext/timestamp/out-of-cue-range.vtt", "cuetext/timestamp/out-of-cue-range.json");
  });

  it("space-after-lt.vtt", function(){
    assert.jsonEqual("cuetext/timestamp/space-after-lt.vtt", "cuetext/timestamp/space-after-lt.json");
  });

  it("space-before-gt.vtt", function(){
    assert.jsonEqual("cuetext/timestamp/space-before-gt.vtt", "cuetext/timestamp/space-before-gt.json");
  });
});
