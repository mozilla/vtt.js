var TestRunner = require("../../../lib/test-runner.js"),
    test = new TestRunner();

describe("cuetext/ruby tests", function(){

  // TODO: Turn ruby processing model tests back on https://github.com/mozilla/vtt.js/issues/246

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("basic.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/basic.vtt", "cuetext/ruby/basic.json", onDone);
  });

  it("rt-no-end-tag.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/rt-no-end-tag.vtt", "cuetext/ruby/rt-no-end-tag.json", onDone);
  });

  it("rt-no-ruby-tag.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/rt-no-ruby-tag.vtt", "cuetext/ruby/rt-no-ruby-tag.json", onDone);
  });

  it("ruby-rt-no-end-tag.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/ruby-rt-no-end-tag.vtt", "cuetext/ruby/ruby-rt-no-end-tag.json", onDone);
  });

  it("with-annotation.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/with-annotation.vtt", "cuetext/ruby/with-annotation.json", onDone);
  });

  it("with-closing-span.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/with-closing-span.vtt", "cuetext/ruby/with-closing-span.json", onDone);
  });

  it("with-subclass.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/with-subclass.vtt", "cuetext/ruby/with-subclass.json", onDone);
  });

  it("with-two-subclasses.vtt", function(onDone){
    test.jsonEqualParsing("cuetext/ruby/with-two-subclasses.vtt", "cuetext/ruby/with-two-subclasses.json", onDone);
  });

});
