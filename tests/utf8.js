var util = require("../lib/util.js"),
    assert = util.assert,
    FakeWindow = util.FakeWindow,
    // http://www.fileformat.info/info/unicode/char/1f638/index.htm
    grinningCatFace = "\uD83D\uDE38";
    text = "Cats ♥ WebVTT " + grinningCatFace,
    badText = text + "\n\uFFFD\uFFFD",
    vtt = "WEBVTT\n\nID\n00:00.000 --> 00:02.000\n" + text + "\n",
    buffer = TextEncoder("utf8").encode(vtt);

describe("UTF8 Encoding Tests", function(){

  it("parse utf8 encoded bytes", function(){
    var WebVTTParser = util.WebVTTParser,
        p = new WebVTTParser(FakeWindow),
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
    assert.equal(cue0.startTime, 0);
    assert.equal(cue0.endTime, 2);
    assert.equal(cue0.text, text);
  });


  it("parse utf8 encoded bytes in pieces", function(){
    var WebVTTParser = util.WebVTTParser,
        p = new WebVTTParser(FakeWindow),
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
    assert.equal(cue0.startTime, 0);
    assert.equal(cue0.endTime, 2);
    assert.equal(cue0.text, text);
  });

  function createBadBuffer() {
    var badBuffer = new Uint8Array(buffer.length + 2);
    for (var i = 0; i < buffer.length; i++)
      badBuffer[i] = buffer[i];
    badBuffer[i] = 194;
    badBuffer[++i] = 194;
    return badBuffer;
  }

  it("parse bad utf8 encoded bytes", function(){
    var WebVTTParser = util.WebVTTParser,
        p = new WebVTTParser(FakeWindow),
        cues = [];
    p.oncue = function(cue) {
      cues.push(cue);
    };

    // Parse utf8 encoded string
    p.parse(createBadBuffer());
    p.flush();

    assert.equal(cues.length, 1);

    var cue0 = cues[0];
    assert.equal(cue0.id, "ID");
    assert.equal(cue0.startTime, 0);
    assert.equal(cue0.endTime, 2);
    assert.equal(cue0.text, badText);
  });

  it("parse bad utf8 encoded bytes in pieces", function(){
    var WebVTTParser = util.WebVTTParser,
        p = new WebVTTParser(FakeWindow),
        cues = [];
    p.oncue = function(cue) {
      cues.push(cue);
    };

    var badBuffer = createBadBuffer();
    // Parse utf8 encoded string
    for (var i = 0; i < badBuffer.length; i++) {
      p.parse(badBuffer.subarray(i, i+1));
    }
    p.flush();

    assert.equal(cues.length, 1);
    var cue0 = cues[0];
    assert.equal(cue0.id, "ID");
    assert.equal(cue0.startTime, 0);
    assert.equal(cue0.endTime, 2);
    assert.equal(cue0.text, badText);
  });

});
