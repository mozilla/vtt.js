// If we're in Node.js then require VTTRegion so we can extend it, otherwise assume
// VTTRegion is on the global.
if (typeof module !== "undefined" && module.exports) {
  this.VTTRegion = require("./vttregion").VTTRegion;
}

// Extend VTTRegion with methods to convert to JSON, from JSON, and construct a
// VTTRegion from an options object. The primary purpose of this is for use in the
// vtt.js test suite. It's also useful if you need to work with VTTRegions in
// JSON format.
(function(root) {

  root.VTTRegion.create = function(options) {
    var region = new root.VTTRegion();
    for (var key in options) {
      if (region.hasOwnProperty(key)) {
        region[key] = options[key];
      }
    }
    return region;
  };

  root.VTTRegion.create = function(json) {
    return this.create(JSON.parse(json));
  };

}(this));
