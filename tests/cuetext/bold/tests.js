var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/bold tests", function(){

  it("not-closed.vtt", function(){
    assert.jsonEqual("cuetext/bold/not-closed.vtt", "cuetext/bold/not-closed.json");
  });

  it("with-annotation.vtt", function(){
    assert.jsonEqual("cuetext/bold/with-annotation.vtt", "cuetext/bold/with-annotation.json");
  });

  it("with-closing-span.vtt", function(){
    assert.jsonEqual("cuetext/bold/with-closing-span.vtt", "cuetext/bold/with-closing-span.json");
  });

  it("with-subclass.vtt", function(){
    assert.jsonEqual("cuetext/bold/with-subclass.vtt", "cuetext/bold/with-subclass.json");
  });

  it("with-two-subclasses.vtt", function(){
    assert.jsonEqual("cuetext/bold/with-two-subclasses.vtt", "cuetext/bold/with-two-subclasses.json");
  });

});
