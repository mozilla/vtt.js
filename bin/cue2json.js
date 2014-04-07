#!/usr/bin/env node

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var opt = require("optimist")
    .usage("Parse VTT files into JSON.\n" +
           "Usage: $0 [options]")
    .demand("v")
    .options("v", {
      alias: "vtt",
      describe: "Path to a VTT file or directory that contains VTT files to be processed."
    })
    .options("c", {
      alias: "copy",
      describe: "Copies output to a JSON file with the same name as the source VTT file."
    })
    .options("p", {
      alias: "process",
      describe: "Generate JSON from running the WebVTT processing model. Default is JSON from the WebVTT parser."
    })
    .options("n", {
      alias: "new",
      describe: "Creates a new JSON file for any VTT file that does not have one. Works recursively in a directory."
    }),
  argv = opt.argv,
  path = require("path"),
  fs = require("fs"),
  NodeVTT = require("node-vtt"),
  exec = require("child_process").exec,
  dive = require("dive"),
  stringify = require("json-stable-stringify");

function fail(message, fatal) {
  message = message || "Unable to process request.";
  console.error("Error: " + message);
  if (fatal) {
    process.exit(1);
  }
  return false;
}

// Create an instance of NodeVTT which interfaces with vtt.js and PhantomJS for us.
function createNodeVTT(onCreated) {
  var parser = new NodeVTT();
  parser.init({ uri: path.resolve(__dirname, "../utils/basic.html") }, function(error) {
    if (error) {
      parser.shutdown();
      fail("Unable to initialize an instance of NodeVTT. " + error.message,
           true);
    }
    onCreated(parser);
  });
}

// Write JSON either to standard out or to a file.
function writeOutput(data, filePath) {
  var json;
  try {
    json = stringify(data, { space: "  " });
  } catch(error) {
    return fail("Unable to jsonify data. " + error.message);
  }
  if (filePath) {
    console.log("Writing " + filePath);
    try {
      fs.writeFileSync(filePath, json + "\n");
      return true;
    } catch (e) {
      return fail("Unable to write output. " + e.message);
    }
  }
  console.log(json);
  return true;
}

// Get the file name of the file we should save the JSON to.
function getJSONFileName(filePath) {
  if (argv.c && argv.p) {
    return filePath.replace(/\.vtt$/, "-proc.json");
  }
  if (argv.c) {
    return filePath.replace(/\.vtt$/, ".json");
  }
}

// Will either just parse a VTT file or will run the processing model as well
// based on what command line arguments have been passed.
function doParserAction(parser, filePath, onCompleted) {
  if (argv.p) {
    return parser.processFile(filePath, onCompleted);
  }
  parser.parseFile(filePath, function(error) {
    if (error) {
      return onCompleted(error);
    }
    parser.flush(function() {
      return onCompleted(null, parser.vtt);
    });
  });
}

// Process a single VTT file and output it's JSON.
function processSingleFile(filePath) {
  createNodeVTT(function(parser) {
    doParserAction(parser, filePath, function(error, data) {
      if (error) {
        parser.shutdown();
        fail(error.message, true);
      }
      writeOutput(data, getJSONFileName(filePath));
      parser.shutdown();
    });
  });
}

// Walk through a directory tree and process any number of VTT files into JSON.
// Which VTT files and where the output of the JSON goes is determined by the
// arguments passed to the script.
function recurse(filePath) {
  createNodeVTT(function(parser) {
    var files = [];
    function onFile(error, file) {
      if (file.match(/\.json$/) && !argv.p) {
        filePath = file.replace(/\.json$/, ".vtt");
        if (fs.existsSync(filePath)) {
          files.push(filePath);
        }
      } else if (file.match(/\.vtt$/) && argv.n) {
        files.push(file);
      }
    }

    function onCompleted() {
      var count = total = files.length;
      function iterate() {
        if (files.length === 0) {
          console.log("Files Written: " + count + ", Failed: " +
                      (total - count) + ".");
          return parser.shutdown();
        }
        var file = files.pop();
        doParserAction(parser, file, function(error, data) {
          if (error) {
            count--;
            return fail("Couldn't write " + file + ". " + error.message);
          }
          writeOutput(data, getJSONFileName(file));
          parser.clear(iterate);
        });
      }
      iterate();
    }

    dive(filePath, onFile, onCompleted);
  });
}

if (!fs.existsSync(path.resolve(__dirname, "../dev_build/vtt.min.js"))) {
  fail("Error: You must first build vtt.js by running `grunt dev-build`", true);
}
var filePath = argv.v;
try {
  var stats = fs.lstatSync(filePath);
  if (stats.isDirectory()) {
    argv.c = true; // Default when walking dirs is to write to copy.
    // If we're recursively writing processing model JSON files then we want
    // to write every file we find.
    if (argv.p) {
      argv.n = true;
    }
    return recurse(filePath);
  }
  if(!filePath.match(/\.vtt$/)) {
    fail("Error: File must be a VTT file.", true);
  }
  processSingleFile(filePath);
} catch(error) {
  fail(error.message, true);
}
