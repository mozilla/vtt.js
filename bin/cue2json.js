#!/usr/bin/env node
var opt = require("optimist")
    .usage("Generate JSON test files from a reference VTT file.\nUsage:" +
           " $0 [options]")
    .options("v", {
      alias: "vtt",
      describe: "Path to VTT file."
    })
    .options("d", {
      alias: "dir",
      describe: "Path to test directory. Will recursively find all JSON " + 
                "files with matching VTT files and rewrite them."
    })
    .options("c", {
      alias: "copy",
      describe: "Copies the VTT file to a JSON file with the same name."
    })
    .options("p", {
      alias: "process",
      describe: "Generate a JSON file of the output returned from the processing model."
    }),
  argv = opt.argv,
  path = require("path"),
  fs = require("fs"),
  util = require("../lib/util.js");

function flipName(fileName) {
  if (fileName.match(/\.vtt$/))
    return fileName.replace(/\.vtt$/, ".json");
  return fileName.replace(/\.json$/, ".vtt");
}

function getJSON(fileName) {
  if (argv.p)
    return JSON.stringify(util.runProcessingModel(fileName), util.filterJson, 2);
  return JSON.stringify(util.parse(fileName, true), util.filterJson, 2);
}

function writeJSON(fileName) {
  if (argv.c || argv.d)
    fs.writeFileSync(flipName(fileName), getJSON(fileName) + "\n");
  else
    console.log(getJSON(fileName));
}

function rewriteJSON(dirName) {
  var files = fs.readdirSync(dirName);
  for (var i = 0; i < files.length; i++) {
    var nextPath = path.join(dirName, files[i]);
    if (fs.lstatSync(nextPath).isDirectory())
      rewriteJSON(nextPath);
    else {
      if (nextPath.match(/\.json$/)) {
        var vttPath = flipName(nextPath);
        if (fs.existsSync(vttPath))
          writeJSON(vttPath);
      }
    }
  }
}

function fail(message) {
  if (message)
    console.log("Error: " + message + "\n");
  console.log(opt.help());
  process.exit(1);
}

try {
  if (argv.v && typeof argv.v === "string") {
    if (!fs.lstatSync(argv.v).isFile())
      fail("No such file.");
    if (!argv.v.match(/\.vtt$/))
      fail("Must pass a WebVTT file.");
    writeJSON(argv.v);
  }
  else if (argv.d && typeof argv.d === "string") {
    if (!fs.lstatSync(argv.d).isDirectory())
      fail("No such directory.");
    rewriteJSON(argv.d);
  }
  else
    fail();
} catch(err) {
  fail(err.message);
}
