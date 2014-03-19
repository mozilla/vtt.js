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

var Phantom = require("node-phantom"),
    VTTCue = require("./vttcue-extended").VTTCue,
    VTTRegion = require("./vttregion-extended").VTTRegion,
    fs = require("fs");

// NodeVTT is a NodeJS wrapper for vtt.js that runs on an instance of PhantomJS.
// Aggregates the parsed cues, regions, and errors.
function NodeVTT() {
  this.cues = [];
  this.regions = [];
  this.errors = [];
  Object.defineProperties(this, {
    "ready": {
      get: function() { return this.phantom && this.page; }
    },
    "vtt": {
      get: function() { return { regions: this.regions, cues: this.cues }; }
    }
  });
}

// Spin up a new PhantomJS instance that NodeVTT can use to run vtt.js on. The
// URI that is passed must have an instance of WebVTT.Parser attached to the
// window and reroute oncue and onregion callbacks to PhantomJS via
// window.callPhantom({ cue: cue }) or window.callPhantom({ region: region })
NodeVTT.prototype.init = function(uri, onInit) {
  if (typeof uri === "function") {
    onInit = uri;
    uri = "./utils/basic.html";
  }

  var self = this;
  Phantom.create(function(error, ph) {
    if (error) {
      return onInit(error);
    }
    ph.createPage(function(error, page) {
      if (error) {
        return onInit(error);
      }
      page.open(uri, function(error, status) {
        if (error || status === "fail") {
          return onInit({ message: "Unable to open a page for " + uri + ". " +
                                    (error ? error.message : "") });
        }
        self.page = page;
        // Redirect console messages in PhantomJS to the command line.
        self.page.onConsoleMessage = function (msg) {
          console.log(msg);
        };
        // Redirect error message in PhantomJS to the command line.
        self.page.onError = function(message) {
          console.error(message);
        };
        // Aggregate the parsed cues and regions.
        self.page.onCallback = function(data) {
          data.error && self.errors.push(data.error);
          data.cue && self.cues.push(VTTCue.create(data.cue));
          data.region && self.regions.push(VTTRegion.create(data.region));
        };
        self.phantom = ph;
        onInit();
      });
    });
  });
};

// Shutdown the PhantomJS instance that NodeVTT runs vtt.js on.
NodeVTT.prototype.shutdown = function() {
  if (this.phantom) {
    this.phantom.exit();
    // Set to null so we don't mistakenly think we've been inited somewhere later.
    this.page = null;
    this.phantom = null;
  }
};

// Flush the parser. This will finish parsing what it has and clear the state of
// the parser.
NodeVTT.prototype.flush = function(onFlush) {
  if (!this.ready) {
    return onFlush({ message: "You must call init before calling anything else." });
  }

  function onCompleted(error) {
    if (error) {
      return onFlush(error);
    }
    return onFlush();
  }

  this.page.evaluate(function() {
    return p.flush();
  }, onCompleted);
};

// Clears the state of NodeVTT.
NodeVTT.prototype.clear = function(onClear) {
  this.cues = [];
  this.regions = [];
  this.page.evaluate(function() {
    window.p = new WebVTT.Parser(window);
    p.oncue = function(cue) {
      window.callPhantom({ cue: cue });
    };
    p.onregion = function(region) {
      window.callPhantom({ region: region });
    };
    p.onparsingerror = function(e) {
      window.callPhantom({ error: e });
    };
  }, onClear);
};

// Parse VTT within the context of a PhantomJS page.
NodeVTT.prototype.parse = function(uint8Array, onParsed) {
  if (!this.ready) {
    return onParsed({ message: "You must call init before calling anything else." });
  }

  this.page.evaluate(function(array) {
    if (!Object.toUint8Array) {
      Object.prototype.toUint8Array = function() {
        var len = this.length,
            uint8Array = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          uint8Array[i] = this[i];
        }
        return uint8Array;
      };
    }
    return p.parse(array.toUint8Array());
  }, onParsed, uint8Array);
};

// Parse VTT data from a file.
NodeVTT.prototype.parseFile = function(vttFile, onParsed) {
  var data;
  try {
    data = fs.readFileSync(vttFile);
  } catch (error) {
    return onParsed({ message: "Unable to read the file at " + vttFile +
                               ". Error: " + error.message });
  }
  var self = this;
  self.parse(data, function(error) {
    if (error) {
      return onParsed(error);
    }
    self.flush(onParsed);
  });
};

// Run the processing model on parsed VTT data. If no data is passed it will
// process the cues and regions that it has in its state.
NodeVTT.prototype.processParsedData = function(data, onProcessed) {
  if (typeof data === "function") {
    onProcessed = data;
    data = null;
  }

  function onCompleted(error, processedData) {
    if (error) {
      return onProcessed(error);
    }
    return onProcessed(null, processedData);
  }

  var cues = (data && ("cues" in data)) ? data.cues : this.cues;
  this.page.evaluate(function(cues) {
    cues = cues.map(function(cue) {
      return VTTCue.create(cue);
    });
    var overlay = document.getElementById("overlay");
    WebVTT.processCues(window, cues, overlay);

    var divs = [];
    // The first child of overlay will be the padded overlay div, which we
    // don't want to return, so just take the child nodes of the padded overlay.
    var nodes = (overlay.childNodes && overlay.childNodes[0] &&
                 overlay.childNodes[0].childNodes) || [];
    for (var i = 0, l = nodes.length; i < l; i++) {
      divs.push(filterElement(nodes[i]));
    }

    return divs;
  }, onCompleted, cues);
};

// Run the processing model on parsed VTT data from a file.
NodeVTT.prototype.processFile = function(vttFile, onProcessed) {
  var self = this;
  self.parseFile(vttFile, function(error) {
    if (error) {
      return onProcessed(error);
    }
    self.processParsedData(onProcessed);
  });
};

module.exports = NodeVTT;
