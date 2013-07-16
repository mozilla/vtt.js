var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cue-settings/line tests", function(){

  it("bad-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/line/bad-delimiter.vtt", "cue-settings/line/bad-line.json");
  });

  it("bad-line.vtt", function(){
    assert.jsonEqual("cue-settings/line/bad-line.vtt", "cue-settings/line/bad-line.json");
  });

  it("bogus-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/bogus-value.vtt", "cue-settings/line/bad-line.json");
  });

  it("dash-in-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/dash-in-value.vtt", "cue-settings/line/bad-line.json");
  });

  it("integer-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/integer-value.vtt", "cue-settings/line/integer-value.json");
  });

  it("large-integer-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/large-integer-value.vtt", "cue-settings/line/large-integer-value.json");
  });

  it("negative-integer-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/negative-integer-value.vtt", "cue-settings/line/negative-integer-value.json");
  });

  it("negative-percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/negative-percent-value.vtt", "cue-settings/line/bad-line.json");
  });

  it("negative-zeros.vtt", function(){
    assert.jsonEqual("cue-settings/line/negative-zeros.vtt", "cue-settings/line/negative-zeros.json");
  });

  it("no-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/no-value.vtt", "cue-settings/line/bad-line.json");
  });

  it("percent-in-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/percent-in-value.vtt", "cue-settings/line/bad-line.json");
  });

  it("percent-over.vtt", function(){
    assert.jsonEqual("cue-settings/line/percent-over.vtt", "cue-settings/line/bad-line.json");
  });

  it("percent-value.vtt", function(){
    assert.jsonEqual("cue-settings/line/percent-value.vtt", "cue-settings/line/percent-value.json");
  });

  it("space-after-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/line/space-after-delimiter.vtt", "cue-settings/line/bad-line.json");
  });

  it("space-before-delimiter.vtt", function(){
    assert.jsonEqual("cue-settings/line/space-before-delimiter.vtt", "cue-settings/line/bad-line.json");
  });

});
