var util = require("../../lib/util.js"),
    assert = util.assert;

describe("processing-model tests", function(){

  it("basic.vtt", function(){
    assert.checkProcessingModel("processing-model/basic.vtt", "processing-model/basic.json");
  });

  it("basic.vtt", function(){
    assert.checkProcessingModel("processing-model/writing-mode-horizontal-tb.vtt", "processing-model/writing-mode-horizontal-tb.json");
  });

  it("basic.vtt", function(){
    assert.checkProcessingModel("processing-model/writing-mode-lr.vtt", "processing-model/writing-mode-vertical-lr.json");
  });

  it("basic.vtt", function(){
    assert.checkProcessingModel("processing-model/writing-mode-vertical-rl.vtt", "processing-model/writing-mode-vertical-rl.json");
  });

});
