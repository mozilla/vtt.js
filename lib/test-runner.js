var NodeVTT = require("./node-vtt"),
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
  this.nodeVTT.init(onInit);
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

// Compare JSON to live parsed data that has been passed as a whole to the parser.
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
    parse: function(onDone) {
      self.nodeVTT.parseFile(vttFile, onDone);
    },
    vtt: function(onDone) {
      onDone(null, self.nodeVTT.vtt);
    },
    clear: function(onDone) {
      self.nodeVTT.clear(onDone);
    }
  }, function onDone(error, results) {
    testDone(error, results.vtt, json, message, "parsing utf8 without streaming", onTestFinish);
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

  async.series({
    processFile: function(onContinue) {
      self.nodeVTT.processFile(vttFile, onContinue);
    },
    clear: function(onContinue) {
      self.nodeVTT.clear(onContinue);
    }
  }, function(error, results) {
    testDone(error, results.processFile, json, message,
             "running the processing model", onTestFinish)
  });
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
