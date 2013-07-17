#!/usr/bin/env node

if (process.argv.length !== 3) {
  console.error("Error: missing .vtt filename to process");
  console.error("Usage: cue2json <filename>");
  process.exit(1);
}

var filename = process.argv[2],
    util = require("../lib/util.js"),
    vtt = util.parse(filename, true);

console.log(JSON.stringify(vtt, util.filterJson, 2));
