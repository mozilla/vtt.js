// If we're in Node.js then require VTTCue so we can extend it, otherwise assume
// VTTCue is on the global.
if (typeof module !== "undefined" && module.exports) {
  this.VTTCue = this.VTTCue || require("./vttcue").VTTCue;
}

// Extend VTTCue with methods to convert to JSON, from JSON, and construct a
// VTTCue from an options object. The primary purpose of this is for use in the
// vtt.js test suite (for testing only properties that we care about). It's also
// useful if you need to work with VTTCues in JSON format.
(function(root) {

  root.VTTCue.prototype.toJSON = function() {
    var cue = {},
        self = this;
    // Filter out getCueAsHTML as it's a function and _reset and displayState as
    // they're only used when running the processing model algorithm.
    Object.keys(this).forEach(function(key) {
      if (key !== "getCueAsHTML" && key !== "_reset" && key !== "displayState") {
        cue[key] = self[key];
      }
    });
    return cue;
  };

  root.VTTCue.create = function(options) {
    if (!options.hasOwnProperty("startTime") || !options.hasOwnProperty("endTime") ||
        !options.hasOwnProperty("text")) {
      throw new Error("You must at least have start time, end time, and text.");
    }
    var cue = new root.VTTCue(options.startTime, options.endTime, options.text);
    for (var key in options) {
      if (cue.hasOwnProperty(key)) {
        cue[key] = options[key];
      }
    }
    return cue;
  };

  root.VTTCue.fromJSON = function(json) {
    return this.create(JSON.parse(json));
  };

}(this));
