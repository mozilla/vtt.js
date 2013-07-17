var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/format tests", function(){

  it("double-line-break.vtt", function(){
    assert.jsonEqual("cuetext/format/double-line-break.vtt", "cuetext/format/double-line-break.json");
  });

  it("line-breaks.vtt", function(){
    assert.jsonEqual("cuetext/format/line-breaks.vtt", "cuetext/format/line-breaks.json");
  });

  it("long-line.vtt", function(){
    assert.jsonEqual("cuetext/format/long-line.vtt", "cuetext/format/long-line.json");
  });

  it("no-line-break.vtt", function(){
    assert.jsonEqual("cuetext/format/no-line-break.vtt", "cuetext/format/no-line-break.json");
  });

  it("no-newline-at-end.vtt", function(){
    assert.jsonEqual("cuetext/format/no-newline-at-end.vtt", "cuetext/format/no-newline-at-end.json");
  });

});
