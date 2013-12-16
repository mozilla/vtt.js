(function(root) {

  var autoKeyword = "auto";
  var directionSetting = [ "", "lr", "rl" ];
  var alignSetting = [ "start", "middle", "end", "left", "right" ];

  function findDirectionSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var index = directionSetting.indexOf(value.toLowerCase());
    return index === -1 ? false : directionSetting[index];
  }

  function findAlignSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var index = alignSetting.indexOf(value.toLowerCase());
    return index === -1 ? false : alignSetting[index];
  }

  function VTTCue(startTime, endTime, text) {

    /**
     * Shim implementation specific properties. These properties are not in
     * the spec.
     */

    // Lets us know when the VTTCue's data has changed in such a way that we need
    // to recompute its display state. This lets us compute its display state
    // lazily.
    this.reset = false;

    /**
     * VTTCue and TextTrackCue properties
     * http://dev.w3.org/html5/webvtt/#vttcue-interface
     */

    var _id = "";
    var _pauseOnExit = false;
    var _startTime = startTime;
    var _endTime = endTime;
    var _text = text;
    var _regionId = "";
    var _vertical = "";
    var _snapToLines = true;
    var _line = "auto";
    var _lineAlign = "start";
    var _position = 50;
    var _positionAlign = "middle";
    var _size = 50;
    var _align = "middle";

    Object.defineProperties(this, {
      "id": {
        enumerable: true,
        get: function() {
          return _id;
        },
        set: function(value) {
          _id = "" + value;
        }
      },
      "pauseOnExit": {
        enumerable: true,
        get: function() {
          return _pauseOnExit;
        },
        set: function(value) {
          _pauseOnExit = !!value;
        }
      },
      "startTime": {
        enumerable: true,
        get: function() {
          return _startTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("Start time must be set to a number.");
          }
          _startTime = value;
          this.reset = true;
        }
      },
      "endTime": {
        enumerable: true,
        get: function() {
          return _endTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("End time must be set to a number.");
          }
          _endTime = value;
          this.reset = true;
        }
      },
      "text": {
        enumerable: true,
        get: function() {
          return _text;
        },
        set: function(value) {
          _text = "" + value;
          this.reset = true;
        }
      },
      "regionId": {
        enumerable: true,
        get: function() {
          return _regionId;
        },
        set: function(value) {
          _regionId = "" + value;
          this.reset = true;
        },
      },
      "vertical": {
        enumerable: true,
        get: function() {
          return _vertical;
        },
        set: function(value) {
          var setting = findDirectionSetting(value);
          // Have to check for false because the setting an be an empty string.
          if (setting === false) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _vertical = setting;
          this.reset = true;
        },
      },
      "snapToLines": {
        enumerable: true,
        get: function() {
          return _snapToLines;
        },
        set: function(value) {
          _snapToLines = !!value;
          this.reset = true;
        }
      },
      "line": {
        enumerable: true,
        get: function() {
          return _line;
        },
        set: function(value) {
          if (typeof value !== "number" && value !== autoKeyword) {
            throw new SyntaxError("An invalid number or illegal string was specified.");
          }
          _line = value;
          this.reset = true;
        }
      },
      "lineAlign": {
        enumerable: true,
        get: function() {
          return _lineAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _lineAlign = setting;
          this.reset = true;
        }
      },
      "position": {
        enumerable: true,
        get: function() {
          return _position;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Position must be between 0 and 100.");
          }
          _position = value;
          this.reset = true;
        }
      },
      "positionAlign": {
        enumerable: true,
        get: function() {
          return _positionAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _positionAlign = setting;
          this.reset = true;
        }
      },
      "size": {
        enumerable: true,
        get: function() {
          return _size;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Size must be between 0 and 100.");
          }
          _size = value;
          this.reset = true;
        }
      },
      "align": {
        enumerable: true,
        get: function() {
          return _align;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _align = setting;
          this.reset = true;
        }
      }
    });

    /**
     * Other <track> spec defined properties
     */

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state
    this.displayState = undefined;
  }

  /**
   * VTTCue methods
   */

  VTTCue.prototype.getCueAsHTML = function() {
    // Assume WebVTTParser is on the global.
    return WebVTTParser.parseContent(window, this.text);
  };

  root.VTTCue = root.VTTCue || VTTCue;
}(this));
