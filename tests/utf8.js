var util = require("../lib/util.js"),
    assert = util.assert,
    // http://www.fileformat.info/info/unicode/char/1f638/index.htm
    grinningCatFace = "\uD83D\uDE38";
    text = "Cats ♥ WebVTT " + grinningCatFace,
    vtt = "WEBVTT\n\nID\n00:00.000 --> 00:02.000\n" + text,
    buffer = TextEncoder("utf8").encode(vtt);

describe("Simple VTT Tests", function(){

  it("parse utf8 encoded bytes", function(){
    var WebVTTParser = util.WebVTTParser,
        p = new WebVTTParser(),
        cues = [];
    p.oncue = function(cue) {
      cues.push(cue);
    };

    // Parse utf8 encoded string
    p.parse(buffer);
    p.flush();

    assert.equal(cues.length, 1);

    var cue0 = cues[0];
    assert.equal(cue0.id, "ID");
    assert.equal(cue0.startTime, "000000000");
    assert.equal(cue0.endTime, "000002000");
    assert.equal(cue0.content, text);
  });


  it("parse utf8 encoded bytes in pieces", function(){
    var WebVTTParser = util.WebVTTParser,
        p = new WebVTTParser(),
        cues = [];
    p.oncue = function(cue) {
      cues.push(cue);
    };

    // Parse utf8 encoded string
    for (var i = 0; i < buffer.length; i++) {
      p.parse(buffer.subarray(i, i+1));
    }
    p.flush();

    assert.equal(cues.length, 1);

    var cue0 = cues[0];
    assert.equal(cue0.id, "ID");
    assert.equal(cue0.startTime, "000000000");
    assert.equal(cue0.endTime, "000002000");
    assert.equal(cue0.content, text);
  });

});
