var WebVTTParser = require("..").WebVTTParser,
    FakeWindow = require("./fake-window.js"),
    assert = Object.create(require("assert")),
    deepEqual = require("underscore").isEqual,
    difflet = require("difflet")({ indent: 2, deepEqual: deepEqual }),
    fs = require("fs"),
    path = require("path");

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

// Flattens cue objects by round-tripping them through JSON to strip
// circular references (e.g., parentNode).
function flattenCues(cues) {
  return cues.map(function(cue) {
    try {
      return JSON.parse(JSON.stringify(cue, filterJson));
    } catch(e) {
      return cue;
    }
  });
}

// Parse the data (i.e., file is already read into `data`), potentially
// splitting parsing into two chunks at `chunkAt`. Leave `chunkAt`
// undefined to parse file whole.
function _parse(data, chunkAt) {
  var result = {
    cues: []
  };
  chunkAt = !!chunkAt ? Math.min(chunkAt, data.length) : 0;

  var p = new WebVTTParser();
  p.oncue = function(cue) {
    // Also parse the cue's content and add the DOM tree.
    cue.domTree = WebVTTParser.convertCueToDOMTree(new FakeWindow(),
                                                   cue, filterJson);
    result.cues.push(cue);
  };
  p.onerror = function(err) {
    result.errors.push(err);
  };

  if (!chunkAt) {
    p.parse(data);
  } else {
    p.parse(data.substr(0, chunkAt));
    p.parse(data.substr(chunkAt));
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

  return _parse(fs.readFileSync(filename, "utf8"));
}

function getCues(data, chunkAt) {
  var cues;
  try {
    cues = _parse(data, chunkAt).cues;
  } catch(e) {
    return null;
  }

  // Fix circular reference issues in the cues we compare
  cues = flattenCues(cues);

  // If it's a single cue, hoist it like we do with the json files.
  if (cues.length === 1) {
    cues = cues[0];
  }
  return cues;
}

// Extend assert with an easy way to compare json files to parsed vtt files.
assert.jsonEqual = function(vttFilename, jsonFilename, message) {
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

  var data = fs.readFileSync(vttFilename, "utf8"),
      size = data.length;

  // First check that things work when parsing the file whole
  vtt = getCues(data);
  if (!deepEqual(vtt, json)) {
    return fail("parsing file without streaming");
  }

  // Now check again using streaming with different chunk sizes
  while (--size) {
    vtt = getCues(data, size);
    if (!deepEqual(vtt, json)) {
      return fail("parsing file with streaming, chunk size=" + size);
    }
  }

  assert.ok(true, message);
};

module.exports = {
  WebVTTParser: WebVTTParser,
  FakeWindow: FakeWindow,
  filterJson: filterJson,
  assert: assert,
  parse: parse
};
