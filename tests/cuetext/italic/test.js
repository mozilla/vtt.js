var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/italic tests", function(){

  it("not-closed.vtt", function(){
    assert.jsonEqual("cuetext/italic/not-closed.vtt", "cuetext/italic/not-closed.json");
  });

  it("with-annotation.vtt", function(){
    assert.jsonEqual("cuetext/italic/with-annotation.vtt", "cuetext/italic/with-annotation.json");
  });

  it("with-closing-span.vtt", function(){
    assert.jsonEqual("cuetext/italic/with-closing-span.vtt", "cuetext/italic/with-closing-span.json");
  });

  it("with-subclass.vtt", function(){
    assert.jsonEqual("cuetext/italic/with-subclass.vtt", "cuetext/italic/with-subclass.json");
  });

  it("with-two-subclasses.vtt", function(){
    assert.jsonEqual("cuetext/italic/with-two-subclasses.vtt", "cuetext/italic/with-two-subclasses.json");
  });

});
