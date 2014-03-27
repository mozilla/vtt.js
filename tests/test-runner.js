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

var NodeVTT = require("node-vtt"),
    deepEqual = require("underscore").isEqual,
    difflet = require("difflet")({ indent: 2, deepEqual: deepEqual }),
    fs = require("fs"),
    path = require("path"),
    assert = Object.create(require("assert")),
    async = require("async");

// Re-root paths to tests/* since we're in tests/util/*
function fixTestPath(filename) {
  return path.join(__dirname, "..", "tests", filename);
}

// Fail the test with an optional error message to console.
function fail(message, error) {
  if (error) {
    console.error(error);
  }
  assert.ok(false, message);
}

// Evaluate data from test and determine if it's a pass or fail.
function testDone(error, vtt, json, message, testType, onDone) {
  try {
    vtt = JSON.parse(JSON.stringify(vtt));
  } catch(e) {
    fail(message, "Unable to JSONify VTT data.");
  }
  if (error) {
    fail(message, "Failed test while " + testType + ".");
  } else if (!deepEqual(vtt, json)) {
    var diff = difflet.compare(vtt, json);
    fail(message, "Failed JSON diff while " + testType + ".\n" + diff);
  } else {
    assert.ok(true, message);
  }
  onDone();
}

function TestRunner() {
  Object.defineProperty(this, "ready", {
    get: function() { return this.nodeVTT; }
  });
}

// Use Node's assert module for our tests.
TestRunner.prototype.assert = assert;

// Set up an instance of NodeVTT that we can use to run our tests.
TestRunner.prototype.init = function(onInit) {
  this.nodeVTT = new NodeVTT();
  this.nodeVTT.init({ uri: path.resolve(__dirname, "../utils/basic.html") }, onInit);
};

// Shutdown the NodeVTT instance that we've been using.
TestRunner.prototype.shutdown = function() {
  this.nodeVTT.shutdown();
};

// Assert that the TestRunner is ready to run tests.
TestRunner.prototype.assertReady = function(ready) {
  if (!this.ready) {
    fail("TestRunner configured incorrectly. " +
         "You must call TestRunner.init() before calling anything else.");
  }
};

// Compare JSON to live parsed utf8 and string data that has been passed as a whole to the parser.
TestRunner.prototype.jsonEqual = function(vttFile, jsonFile, message, onTestFinish) {
  this.assertReady();

  if (typeof message === "function") {
    onTestFinish = message;
    message = null;
  }
  message = message || "Compare parsed output of " + vttFile + " to " + jsonFile + ".";
  jsonFile = fixTestPath(jsonFile);
  vttFile = fixTestPath(vttFile);

  var self = this,
      json = require(jsonFile);

  async.series({
    utf8Parse: function(onDone) {
      self.nodeVTT.parseFile(vttFile, onDone);
    },
    firstTest: function(onDone) {
      testDone(null, self.nodeVTT.vtt, json, message,
               "parsing utf8 without streaming", onDone);
    },
    setupParser: function(onDone) {
      self.nodeVTT.setupParser("string", onDone);
    },
    stringParse: function(onDone) {
      var vtt = fs.readFileSync(vttFile, { encoding: "utf8" });
      // Strip the BOM character if there is one.
      vtt.charCodeAt(0) === 65279 && (vtt = vtt.substr(1));
      self.nodeVTT.parse(vtt, onDone);
    },
    flush: function(onDone) {
      self.nodeVTT.flush(onDone);
    },
    secondTest: function(onDone) {
      testDone(null, self.nodeVTT.vtt, json, message,
               "parsing string without streaming", onDone);
    },
    resetParser: function(onDone) {
      self.nodeVTT.setupParser("utf8", onDone);
    }
  }, function onDone(error) {
    error && fail("failed on parsing without streaming", error);
    onTestFinish();
  });
};

// Compare JSON to live parsed data that has been streamed to the parser.
TestRunner.prototype.jsonEqualStreaming = function(vttFile, jsonFile, message, onTestFinish) {
  this.assertReady();

  if (typeof message === "function") {
    onTestFinish = message;
    message = null;
  }
  message = message || "Compare parsed output of " + vttFile + " to " + jsonFile + " with streaming.";
  jsonFile = fixTestPath(jsonFile);
  vttFile = fixTestPath(vttFile);

  var self = this,
      json = require(jsonFile),
      vtt = fs.readFileSync(vttFile),
      size = vtt.length;

  async.whilst(
    function() {
      return --size >= 3;
    },
    function(onWhilst) {
      async.series({
        parseFirst: function(onSeries) {
          self.nodeVTT.parse(vtt.slice(0, size), onSeries);
        },
        parseSecond: function(onSeries) {
          self.nodeVTT.parse(vtt.slice(size), onSeries);
        },
        flush: function(onSeries) {
          self.nodeVTT.flush(onSeries);
        },
        vtt: function(onSeries) {
          onSeries(null, self.nodeVTT.vtt);
        },
        clear: function(onSeries) {
          self.nodeVTT.clear(onSeries);
        }
      }, function(error, results) {
        testDone(error, results.vtt, json, message,
                 "parsing utf8 with streaming; chunk number: " + size, onWhilst);
      });
    },
    function(error) {
      if (error) {
        fail(message, error + " while parsing utf8 with streaming.");
      }
      onTestFinish();
    }
  );
};

// Compare JSON to live parsed output for streaming VTT data and parsing whole
// VTT data.
TestRunner.prototype.jsonEqualParsing = function(vttFile, jsonFile, message, onTestFinish) {
  this.assertReady();

  var self = this;
  if (typeof message === "function") {
    onTestFinish = message;
    message = null;
  }
  async.series({
    first: function(onContinue) {
      self.jsonEqual(vttFile, jsonFile, message, onContinue);
    },
    second: function(onContinue) {
      self.jsonEqualStreaming(vttFile, jsonFile, message, onContinue);
    }
  }, onTestFinish);
};

const LINE_HEIGHT = 8;
const EDGES = {
  "": {
    line: "height",
    topEdge: "top",
    bottomEdge: "bottom",
    max: 150
  },
  "rl": {
    line: "width",
    topEdge: "right",
    bottomEdge: "left",
    max: 300
  },
  "lr": {
    line: "width",
    topEdge: "left",
    bottomEdge: "right",
    max: 300
  }
};

// This function attempts to 'balance' the computed values of the processing
// model CSS styles. On each platform and browser we will get different computed
// heights/widths, etc. Therefore, we can't use straight comparison of JSON.
function balanceComputedValues(cues, vtt, json) {

  function getEdges(cue) {
    var edges = EDGES[cue.vertical];
    // If the cue has, or will have in the case of 'auto', a negative value
    // then the reference edges are reversed. Line counts start fom the bottom
    // of the writing direction, not the top.
    var top = edges.topEdge,
        bot = edges.bottomEdge;
    if (cue.line < 0 || cue.line === "auto") {
      var temp = top;
      top = bot;
      bot = temp;
    }
    return {
      line: edges.line,
      max: edges.max,
      topEdge: top,
      bottomEdge: bot
    };
  }

  function pxToNum(num) {
    return parseFloat(num.replace("px", ""));
  }

  try {
    // Assumes that the 'json' object is a JSONified array and loops through
    // each index, in this case key, and attempts to balance the comptued values
    // of it in relation to the expected values in the corresponding JSON test
    // file. It does this by calculating the computed difference in line heights
    // of the expected value and the actual computed value and offsetting the
    // actual value by a multiple of that amount depending on if the cue has been
    // set to snap to lines, or a percentage.
    Object.keys(json).forEach(function(index) {
      var i = index | 0,
          cue = cues[i],
          js = json[i].style,
          vs = vtt[i].style;

      // If the cue has been set to snap to lines then we can figure out the
      // difference between the computed and expected line height, determine how
      // many 'steps' the cue has moved in any direction on the video (one step
      // is the amount of one line height), and offset the actual computed values
      // by that amount. This works because if the calculated position has the
      // same step ratios as the expected position then it will be offset by the
      // correct amount.
      if (cue.snapToLines) {
        var edges = getEdges(cue);
        // If the line heights are the same then we don't need to balance them.
        if (js[edges.line] !== vs[edges.line]) {
          var lineCount = pxToNum(js[edges.line]) / LINE_HEIGHT,
              computeDiff = (pxToNum(vs[edges.line]) - pxToNum(js[edges.line])) / lineCount,
              offset = computeDiff * (pxToNum(js[edges.topEdge]) / LINE_HEIGHT),
              vsTop = pxToNum(vs[edges.topEdge]),
              vsBottom = pxToNum(vs[edges.bottomEdge]);
          // Balance line height; should be the same.
          vs[edges.line] = js[edges.line];
          // Balance top and bottom edges by the offset amount.
          if (vsTop !== 0 && vsTop !== edges.max) {
            vs[edges.topEdge] = (vsTop - offset) + "px";
          }
          if (vsBottom !== 0 && vsBottom !== edges.max) {
            var boxOffset = edges.max - Math.abs(pxToNum(js[edges.bottomEdge]));
            if ((vsTop < 0 || vsBottom < pxToNum(js[edges.bottomEdge])) &&
                boxOffset <= 0) {
              offset *= -1;
            }
            if (boxOffset <= 0 || vsTop >= 0) {
              boxOffset = computeDiff * lineCount;
            } else {
              boxOffset = ((boxOffset / LINE_HEIGHT) - 1) * computeDiff;
            }
            vs[edges.bottomEdge] = (vsBottom - offset + boxOffset) + "px";
          }
        }
      // If the cue has not had its snap to lines flag set, meaning it is being
      // positioned by a percentage, than we can simply move the percentage by
      // the difference of the computed values.
      } else {
        var edge = EDGES[cue.vertical];
        var offset = pxToNum(vs[edge.line]) - pxToNum(js[edge.line]);
        vs[edge.bottomEdge] = (pxToNum(vs[edge.bottomEdge]) + offset) + "px";
        vs[edge.line] = js[edge.line];
      }
    });
  } catch (e) {
    fail("Failed on balancing computed values.", e);
  }
}

// Compare JSON to live parsed data that has been run through the WebVTT
// processing model.
TestRunner.prototype.jsonEqualProcModel = function(vttFile, jsonFile, message, onTestFinish) {
  this.assertReady();

  if (typeof message === "function") {
    onTestFinish = message;
    message = null;
  }
  message = message || "Compare processed output of " + vttFile + " to " + jsonFile + ".";
  jsonFile = fixTestPath(jsonFile);
  vttFile = fixTestPath(vttFile);

  var self = this,
      json = require(jsonFile);

  async.waterfall([
    function(onContinue) {
      self.nodeVTT.processFile(vttFile, function(error, processedData) {
        return onContinue(error, processedData);
      });
    },
    function(processedData, onContinue) {
      balanceComputedValues(self.nodeVTT.cues, processedData, json);
      onContinue(null, processedData);
    },
    function(processedData, onContinue) {
      self.nodeVTT.clear(function() {
        onContinue(null, processedData);
      });
    }
  ], function(error, results) {
    testDone(error, results, json, message,
             "running the processing model", onTestFinish)
  });
};

// Compare JSON to live parsed data that has been run through the processing model
// and parsed data without streaming.
TestRunner.prototype.jsonEqualAllNoStream =  function(vttFile, jsonFile, message, onTestFinish) {
  this.assertReady();

  var self = this;
  if (typeof message === "function") {
    onTestFinish = message;
    message = null;
  }
  async.series({
    first: function(onContinue) {
      self.jsonEqual(vttFile, jsonFile, message, onContinue);
    },
    second: function(onContinue) {
      jsonFile = vttFile.replace(/\.vtt$/, "-proc.json");
      self.jsonEqualProcModel(vttFile, jsonFile, message, onContinue);
    }
  }, onTestFinish);
};

// Compare JSON to live parsed output for streaming, parsing whole, and processing
// VTT data.
TestRunner.prototype.jsonEqualAll =  function(vttFile, jsonFile, message, onTestFinish) {
  this.assertReady();

  var self = this;
  if (typeof message === "function") {
    onTestFinish = message;
    message = null;
  }
  async.series({
    first: function(onContinue) {
      self.jsonEqualParsing(vttFile, jsonFile, message, onContinue);
    },
    second: function(onContinue) {
      jsonFile = vttFile.replace(/\.vtt$/, "-proc.json");
      self.jsonEqualProcModel(vttFile, jsonFile, message, onContinue);
    }
  }, onTestFinish);
};

module.exports = TestRunner;
