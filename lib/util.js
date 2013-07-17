var WebVTTParser = require("..").WebVTTParser,
    FakeWindow = require("./fake-window.js"),
    assert = Object.create(require("assert")),
    deepEqual = require("deep-equal"),
    difflet = require("difflet")({ indent: 2 }),
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

function parse(filename, usePathUnchanged) {
  var result = {
    cues: []
  };

  if (!usePathUnchanged) {
    filename = fixTestPath(filename);
  }

  var p = new WebVTTParser();
  p.oncue = function(cue) {
    // Also parse the cue's content and add the DOM tree.
    cue.domTree = WebVTTParser.convertCueToDOMTree(new FakeWindow(),
                                                   cue, filterJson);
    result.cues.push(cue);
  };
  p.parse(fs.readFileSync(filename, "utf8"));
  p.flush();

  return result;
}

// Extend assert with an easy way to compare json files to parsed vtt files.
assert.jsonEqual = function(vttFilename, jsonFilename, message) {
  message = message || "Compare " + vttFilename + " to " + jsonFilename;
  var json, vtt;
  jsonFilename = fixTestPath(jsonFilename);

  try {
    json = require(jsonFilename);
  } catch(e) {
    return assert.fail(vttFilename, jsonFilename, "Unable to open " + jsonFilename, "===");
  }

  try {
    vtt = parse(vttFilename).cues;
  } catch(e) {
    return assert.fail(vttFilename, jsonFilename, "Unable to parse " + vttFilename, "===");
  }

  // Fix circular reference issues in the cues we compare
  vtt = flattenCues(vtt);

  // If it's a single cue, hoist it like we do with the json files.
  if (vtt.length === 1) {
    vtt = vtt[0];
  }

  if (deepEqual(vtt, json)) {
    assert.ok(true, message);
  } else {
    // Pretty-print an object diff so we can figure out what failed
    var diff = difflet.compare(vtt, json);
    console.error("Failed JSON diff for " + jsonFilename, diff);
    assert.ok(false, message);
  }
};

module.exports = {
  WebVTTParser: WebVTTParser,
  FakeWindow: FakeWindow,
  filterJson: filterJson,
  assert: assert,
  parse: parse
};
