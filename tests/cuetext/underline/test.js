var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/underline tests", function(){

  it("not-closed.vtt", function(){
    assert.jsonEqual("cuetext/underline/not-closed.vtt", "cuetext/underline/not-closed.json");
  });

  it("with-annotation.vtt", function(){
    assert.jsonEqual("cuetext/underline/with-annotation.vtt", "cuetext/underline/with-annotation.json");
  });

  it("with-closing-span.vtt", function(){
    assert.jsonEqual("cuetext/underline/with-closing-span.vtt", "cuetext/underline/with-closing-span.json");
  });

  it("with-subclass.vtt", function(){
    assert.jsonEqual("cuetext/underline/with-subclass.vtt", "cuetext/underline/with-subclass.json");
  });

  it("with-two-subclasses.vtt", function(){
    assert.jsonEqual("cuetext/underline/with-two-subclasses.vtt", "cuetext/underline/with-two-subclasses.json");
  });

});
