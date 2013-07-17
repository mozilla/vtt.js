var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/voice tests", function(){

  it("no-end-gt.vtt", function(){
    assert.jsonEqual("cuetext/voice/no-end-gt.vtt", "cuetext/voice/no-end-gt.json");
  });

  it("not-closed.vtt", function(){
    assert.jsonEqual("cuetext/voice/not-closed.vtt", "cuetext/voice/not-closed.json");
  });

  it("with-annotation.vtt", function(){
    assert.jsonEqual("cuetext/voice/with-annotation.vtt", "cuetext/voice/with-annotation.json");
  });

  it("with-closing-span.vtt", function(){
    assert.jsonEqual("cuetext/voice/with-closing-span.vtt", "cuetext/voice/with-closing-span.json");
  });

  it("with-subclass.vtt", function(){
    assert.jsonEqual("cuetext/voice/with-subclass.vtt", "cuetext/voice/with-subclass.json");
  });

  it("with-two-subclasses.vtt", function(){
    assert.jsonEqual("cuetext/voice/with-two-subclasses.vtt", "cuetext/voice/with-two-subclasses.json");
  });

});
