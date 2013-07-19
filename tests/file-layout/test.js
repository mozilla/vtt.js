var util = require("../../lib/util.js"),
    assert = util.assert;

describe("file-layout tests", function(){

  it("blank-file-with-bom.vtt", function(){
    assert.jsonEqual("file-layout/blank-file-with-bom.vtt", "file-layout/no-output.json");
  });

  it("blank-file.vtt", function(){
    assert.jsonEqual("file-layout/blank-file.vtt", "file-layout/no-output.json");
  });

  it("bom-garbage-data.vtt", function(){
    assert.jsonEqual("file-layout/bom-garbage-data.vtt", "file-layout/no-output.json");
  });

  it("bom-tab-webvtt.vtt", function(){
    assert.jsonEqual("file-layout/bom-tab-webvtt.vtt", "file-layout/no-output.json");
  });  

  it("cue-spacing.vtt", function(){
    assert.jsonEqual("file-layout/cue-spacing.vtt", "file-layout/cue-spacing.json");
  });

  it.skip("fail-bad-utf8.vtt", function(){
    assert.jsonEqual("file-layout/fail-bad-utf8.vtt", "file-layout/fail-bad-utf8.json");
  });

  it("garbage-signature.vtt", function(){
    var vtt = util.parse("file-layout/garbage-signature.vtt"); 
    assert.equal(vtt.cues.length, 0);
  });  

  it("header-no-new-line.vtt", function(){
    assert.jsonEqual("file-layout/header-no-new-line.vtt", "file-layout/no-output.json");
  });

  it("many-comments.vtt", function(){
    assert.jsonEqual("file-layout/many-comments.vtt", "file-layout/many-comments.json");
  });  

  it("newline-before-webvtt.vtt", function(){
    assert.jsonEqual("file-layout/newline-before-webvtt.vtt", "file-layout/no-output.json");
  });

  it("tab-after-bom-before-header.vtt", function(){
    assert.jsonEqual("file-layout/tab-after-bom-before-header.vtt", "file-layout/no-output.json");
  });

  it("webvtt-no-bom.vtt", function(){
    assert.jsonEqual("file-layout/webvtt-no-bom.vtt", "file-layout/with-data.json");
  });

  it("webvtt-space.vtt", function(){
    assert.jsonEqual("file-layout/webvtt-space.vtt", "file-layout/with-data.json");
  });

  it("webvtt-tab.vtt", function(){
    assert.jsonEqual("file-layout/webvtt-tab.vtt", "file-layout/with-data.json");
  });

  it("webvtt-with-bom.vtt", function(){
    assert.jsonEqual("file-layout/webvtt-with-bom.vtt", "file-layout/with-data.json");
  });

});
