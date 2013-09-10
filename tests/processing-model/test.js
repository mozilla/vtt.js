var util = require("../../lib/util.js"),
    assert = util.assert;

describe("processing-model tests", function(){

  it("basic.vtt", function(){
    assert.checkProcessingModel("processing-model/basic.vtt", "processing-model/basic.json");
  });

});
