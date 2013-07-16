#!/usr/bin/env node

if (process.argv.length !== 3) {
  console.error("Error: missing .vtt filename to process");
  console.error("Usage: cue2json <filename>");
  process.exit(1);
}

var filename = process.argv[2],
    util = require("../lib/util.js"),
    vtt = util.parse(filename, true),
    cues = vtt.cues;

function printCue(cue) {
  cue.domTree = util.WebVTTParser.convertCueToDOMTree(new util.FakeWindow(), cue);
  console.log(JSON.stringify(cue, util.filterJson, 2));
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
