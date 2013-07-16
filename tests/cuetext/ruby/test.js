var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/ruby tests", function(){

  it("basic.vtt", function(){
    assert.jsonEqual("cuetext/ruby/basic.vtt", "cuetext/ruby/basic.json");
  });

  it("rt-no-end-tag.vtt", function(){
    assert.jsonEqual("cuetext/ruby/rt-no-end-tag.vtt", "cuetext/ruby/rt-no-end-tag.json");
  });

  it("rt-no-ruby-tag.vtt", function(){
    assert.jsonEqual("cuetext/ruby/rt-no-ruby-tag.vtt", "cuetext/ruby/rt-no-ruby-tag.json");
  });

  it("ruby-rt-no-end-tag.vtt", function(){
    assert.jsonEqual("cuetext/ruby/ruby-rt-no-end-tag.vtt", "cuetext/ruby/ruby-rt-no-end-tag.json");
  });

  it("with-annotation.vtt", function(){
    assert.jsonEqual("cuetext/ruby/with-annotation.vtt", "cuetext/ruby/with-annotation.json");
  });

  it("with-closing-span.vtt", function(){
    assert.jsonEqual("cuetext/ruby/with-closing-span.vtt", "cuetext/ruby/with-closing-span.json");
  });

  it("with-subclass.vtt", function(){
    assert.jsonEqual("cuetext/ruby/with-subclass.vtt", "cuetext/ruby/with-subclass.json");
  });

  it("with-two-subclasses.vtt", function(){
    assert.jsonEqual("cuetext/ruby/with-two-subclasses.vtt", "cuetext/ruby/with-two-subclasses.json");
  });

});
