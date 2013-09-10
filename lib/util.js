var WebVTTParser = require("..").WebVTTParser,
    FakeWindow = require("./fake-window.js"),
    assert = Object.create(require("assert")),
    deepEqual = require("underscore").isEqual,
    difflet = require("difflet")({ indent: 2, deepEqual: deepEqual }),
    fs = require("fs"),
    path = require("path");

// Converts a node buffer to a Uint8Array buffer.
Buffer.prototype.toUint8Array = function() {
  var buf = new Uint8Array(this.length);
  for (var i = 0; i < this.length; i++)
    buf[i] = this[i];
  return buf;
};

// Re-root paths to tests/* since we're in tests/util/*
function fixTestPath(filename) {
  return path.join(__dirname, "..", "tests", filename);
}

// Set the parentNode value to undefined when trying to stringify the JSON.
// Without this we will get a circular data structure which stringify will
// not be able to handle.
function filterJson(key, value) {
  if (key == "parentNode")
    return undefined;
  return value;
}

// Parse the data (i.e., file is already read into `data`), potentially
// splitting parsing into two chunks at `chunkAt`. Leave `chunkAt`
// undefined to parse file whole. The `decoder` is how we'll decode the
// data (null means use default TextDecoder).
function _parse(data, decoder, chunkAt) {
  var result = {
    regions: [],
    cues: []
  };
  chunkAt = !!chunkAt ? Math.min(chunkAt, data.length) : 0;

  var p = new WebVTTParser(FakeWindow, decoder);
  p.oncue = function(cue) {
    // Also parse the cue's content and run the cue through the processing
    // model.
    cue.domTree = WebVTTParser.processCues(FakeWindow, [cue])[0];
    result.cues.push(cue);
  };
  p.onregion = function(region) {
    result.regions.push(region);
  };

  if (!chunkAt) {
    p.parse(data);
  } else {
    p.parse(data.subarray(0, chunkAt));
    p.parse(data.subarray(chunkAt));
  }
  p.flush();

  return result;
}

// Parse the vtt file at filename. If filename is rooted in tests/
// we need to fix up the path (usePathUnchanged should be false).
// If we want to break the file at a character position to simulate
// streaming, chunkAt should be set to some number <= the number of
// characters in the file.
function parse(filename, usePathUnchanged) {
  if (!usePathUnchanged) {
    filename = fixTestPath(filename);
  }

  return _parse(fs.readFileSync(filename).toUint8Array());
}

function getVttData(data, decoder, chunkAt) {
  var vttData;
  try {
    vttData = _parse(data, decoder, chunkAt);
  } catch(e) {
    return null;
  }

  return JSON.parse(JSON.stringify(vttData, filterJson, 2));
}

// Parse the vtt file and run the processing model over the cues and regions
// of the vtt file. In a real life situation only the cues and regions that are
// being displayed at a single time would be passed into processCues(), but for
// our purposes we can just pass everything in and test. What this means is that
// all the cues in the VTT file will be assumed to be on the screen at the same
// time.
function _runProcessingModel(vttFilename, usePathUnchanged) {
  vttFilename = usePathUnchanged ? vttFilename : fixTestPath(vttFilename);
  var vttData = _parse(fs.readFileSync(vttFilename).toUint8Array());
  return WebVTTParser.processCues(FakeWindow, vttData.cues, vttData.regions);
}

function runProcessingModel(vttFilename) {
  return _runProcessingModel(vttFilename, true);
}

assert.checkProcessingModel = function(vttFilename, jsonFilename, message) {
  var divs = _runProcessingModel(vttFilename),
      vtt = JSON.parse(JSON.stringify(divs, filterJson)),
      json = require(fixTestPath(jsonFilename));

  if (!deepEqual(vtt, json)) {
    var diff = difflet.compare(vtt, json);
    console.error("Failed JSON diff for " + jsonFilename, diff);
    assert.ok(false, message);
  }

  assert.ok(true, message || "Compare " + vttFilename + " proc model to " + jsonFilename);
}

// Extend assert with an easy way to compare json files to parsed vtt files.
function jsonEqual(vttFilename, jsonFilename, message, utf8Only) {
  message = message || "Compare " + vttFilename + " to " + jsonFilename;
  jsonFilename = fixTestPath(jsonFilename);
  vttFilename = fixTestPath(vttFilename);

  var json, vtt;

  function fail(error) {
    // Pretty-print an object diff so we can figure out what failed
    var diff = difflet.compare(vtt, json);
    console.error("Failed JSON diff for " + jsonFilename + " (" + error + ")", diff);
    assert.ok(false, message);
  }

  try {
    json = require(jsonFilename);
  } catch(e) {
    return assert.fail(vttFilename, jsonFilename, "Unable to open " + jsonFilename, "===");
  }

  var data = fs.readFileSync(vttFilename).toUint8Array(),
      size = data.length;

  // First check that things work when parsing the file whole
  vtt = getVttData(data);
  if (!deepEqual(vtt, json)) {
    return fail("parsing file as binary utf8 without streaming");
  }

  // Now check again using streaming with different chunk sizes
  while (--size >= 3) {
    vtt = getVttData(data, null, size);
    if (!deepEqual(vtt, json)) {
      return fail("parsing file as binary utf8 with streaming, chunk size=" + size);
    }
  }

  // Bail now if we're only supposed to run utf8 based tests.
  if (utf8Only) {
    assert.ok(true, message);
    return;
  }

  // Finally, check it using a StringDecoder
  vtt = getVttData(String(fs.readFileSync(vttFilename)), WebVTTParser.StringDecoder());
  if (!deepEqual(vtt, json)) {
    return fail("parsing file as string without streaming");
  }

  assert.ok(true, message);
};

// Compare JSON to live parsed data using both UTF8 and String decoders
assert.jsonEqual = function(vttFilename, jsonFilename, message) {
  jsonEqual(vttFilename, jsonFilename, message);
};

// Compare JSON to live parsed data using only UTF8 decoder
assert.jsonEqualUTF8 = function(vttFilename, jsonFilename, message) {
  jsonEqual(vttFilename, jsonFilename, message, true);
};

// Shim TextEncoder and TextDecoder on the global if necessary so vtt.js
// can find them. See http://encoding.spec.whatwg.org/
var stringencoding = require("./stringencoding/encoding.js");
global.TextEncoder = global.TextEncoder || stringencoding.TextEncoder;
global.TextDecoder = global.TextDecoder || stringencoding.TextDecoder;

module.exports = {
  WebVTTParser: WebVTTParser,
  FakeWindow: FakeWindow,
  filterJson: filterJson,
  assert: assert,
  parse: parse,
  runProcessingModel: runProcessingModel
};
