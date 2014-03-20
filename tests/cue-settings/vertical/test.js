var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cue-settings/vertical tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("bogus-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/vertical/bogus-value.vtt", "cue-settings/vertical/bad-vertical.json", onDone);
  });

  it("capital-keyword.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/vertical/capital-keyword.vtt", "cue-settings/vertical/bad-vertical.json", onDone);
  });

  // TODO: Turn back on in https://github.com/mozilla/vtt.js/issues/243
  it("correct-lr-keyword.vtt", function(onDone){
    test.jsonEqualParsing("cue-settings/vertical/correct-lr-keyword.vtt", "cue-settings/vertical/correct-lr-keyword.json", onDone);
  });

  // TODO: Turn back on in https://github.com/mozilla/vtt.js/issues/243
  it("correct-rl-keyword.vtt", function(onDone){
    test.jsonEqualParsing("cue-settings/vertical/correct-rl-keyword.vtt", "cue-settings/vertical/correct-rl-keyword.json", onDone);
  });

  it("incorrect-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/vertical/incorrect-delimiter.vtt", "cue-settings/vertical/bad-vertical.json", onDone);
  });

  it("incorrect-keyword.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/vertical/incorrect-keyword.vtt", "cue-settings/vertical/bad-vertical.json", onDone);
  });

  it("no-value.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/vertical/no-value.vtt", "cue-settings/vertical/bad-vertical.json", onDone);
  });

  it("space-after-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/vertical/space-after-delimiter.vtt", "cue-settings/vertical/bad-vertical.json", onDone);
  });

  it("space-before-delimiter.vtt", function(onDone){
    test.jsonEqualAll("cue-settings/vertical/space-before-delimiter.vtt", "cue-settings/vertical/bad-vertical.json", onDone);
  });

});
