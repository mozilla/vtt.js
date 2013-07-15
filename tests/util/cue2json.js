#!/usr/bin/env node

if (process.argv.length !== 3) {
  console.error("Error: missing .vtt filename to process");
  console.error("Usage: cue2json <filename>");
  process.exit(1);
}

var filename = process.argv[2],
    WebVTTParser = require("../..").WebVTTParser,
    FakeWindow = require("./fake-window.js"),
    parser = new WebVTTParser(),
    cues = [];

parser.oncue = function(cue) {
  cues.push(cue);
};
parser.parse(require("fs").readFileSync(filename, "utf8"));
parser.flush();

// Set the parentNode value to unefined when trying to stringify the JSON.
// Without this we will get a circular data structure which stringify will
// not be able to handle.
function filterJson(key, value) {
  if (key == "parentNode")
    return undefined;
  return value;
}

function printCue(cue) {
  cue.domTree = WebVTTParser.convertCueToDOMTree(new FakeWindow(), cue);
  console.log(JSON.stringify(cue, filterJson, 2));
}

// Single cue
if (cues.length === 1) {
  printCue(cues[0]);
}
// Array of cues
else {
  console.log("[");
  for (var i = 0; i < cues.length - 1; i++) {
    printCue(cues[i]);
    console.log(",");
  }

  printCue(cues[cues.length-1]);
  console.log("]");
}
