var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/lang tests", function(){

  it("no-end-gt.vtt", function(){
    assert.jsonEqual("cuetext/lang/no-end-gt.vtt", "cuetext/lang/no-end-gt.json");
  });

  it("not-closed.vtt", function(){
    assert.jsonEqual("cuetext/lang/not-closed.vtt", "cuetext/lang/not-closed.json");
  });

  it("with-annotation.vtt", function(){
    assert.jsonEqual("cuetext/lang/with-annotation.vtt", "cuetext/lang/with-annotation.json");
  });

  it("with-closing-span.vtt", function(){
    assert.jsonEqual("cuetext/lang/with-closing-span.vtt", "cuetext/lang/with-closing-span.json");
  });

  it("with-no-annotation.vtt", function(){
    assert.jsonEqual("cuetext/lang/with-no-annotation.vtt", "cuetext/lang/with-no-annotation.json");
  });

  it("with-subclass.vtt", function(){
    assert.jsonEqual("cuetext/lang/with-subclass.vtt", "cuetext/lang/with-subclass.json");
  });

  it("with-two-subclasses.vtt", function(){
    assert.jsonEqual("cuetext/lang/with-two-subclasses.vtt", "cuetext/lang/with-two-subclasses.json");
  });

});
