var jsdom = require("jsdom").jsdom,
    VTTCue = require("./vttcue.js").VTTCue,
    VTTRegion = require("./vttregion.js").VTTRegion;

module.exports = function() {
  var window = jsdom().parentWindow;
  window.VTTCue = VTTCue;
  window.VTTRegion = VTTRegion;
  return window;
};
