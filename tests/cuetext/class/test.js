var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/class tests", function(){

  it("not-closed.vtt", function(){
    assert.jsonEqual("cuetext/class/not-closed.vtt", "cuetext/class/not-closed.json");
  });

  it("with-annotation.vtt", function(){
    assert.jsonEqual("cuetext/class/with-annotation.vtt", "cuetext/class/with-annotation.json");
  });

  it("with-closing-span.vtt", function(){
    assert.jsonEqual("cuetext/class/with-closing-span.vtt", "cuetext/class/with-closing-span.json");
  });

  it("with-subclass.vtt", function(){
    assert.jsonEqual("cuetext/class/with-subclass.vtt", "cuetext/class/with-subclass.json");
  });

  it("with-two-subclasses.vtt", function(){
    assert.jsonEqual("cuetext/class/with-two-subclasses.vtt", "cuetext/class/with-two-subclasses.json");
  });

});
