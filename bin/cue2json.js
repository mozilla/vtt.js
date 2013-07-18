#!/usr/bin/env node

if (process.argv.length < 3) {
  console.error("Error: missing path to process\n" +
                "Usage: cue2json [filename|dirname] [options]\n" +
                "Options:\n" +
                "-j: will parse the vtt file passed in and save it in a corresponding .json file");
  process.exit(1);
}

var path = require("path"),
    fs = require("fs"),
    util = require("../lib/util.js"),
    pathArg = process.argv[2],
    options = process.argv.join();

function getJson(vttFile) {
  var vtt = util.parse(vttFile, true);
  return JSON.stringify(vtt, util.filterJson, 2);
}

function flipName(fileName) {
  if (fileName.match(/\.vtt$/))
    return fileName.replace(/\.vtt$/, ".json");
  else
    return fileName.replace(/\.json$/, ".vtt");
}

function rewriteJson(dirName) {
  var files = fs.readdirSync(dirName);
  for (var i = 0; i < files.length; i++) {
    var nextPath = path.join(dirName, files[i]);
    if (fs.lstatSync(nextPath).isDirectory())
      rewriteJson(nextPath);
    else {
      if (nextPath.match(/\.json$/)) {
        var vttPath = flipName(nextPath);
        if (fs.existsSync(vttPath))
          fs.writeFileSync(nextPath, getJson(vttPath) + "\n");
      }
    }
  }
}

if (fs.lstatSync(pathArg).isDirectory()) {
  rewriteJson(pathArg);
} else {
  if (options.match(/-j/))
    fs.writeFileSync(flipName(pathArg), getJson(pathArg) + "\n");
  else
    console.log(getJson(pathArg));
}
