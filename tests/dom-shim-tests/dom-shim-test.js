global.navigator = {
  userAgent: ''
};

var VTTCue = require("../../lib/vttcue.js").VTTCue,
    VTTRegion = require("../../lib/vttregion.js").VTTRegion,
    assert = Object.create(require("assert"));

function testEnum(obj, prop, set) {
  set.forEach(function(enumVal) {
    obj[prop] = enumVal;
    assert.equal(obj[prop], enumVal, (typeof obj) + "'s " + prop + " property should be set to " + enumVal);
  });
  assert.throws(function() {
    cue[prop] = 123123;
  }, null, "Setting " + (typeof obj) + "'s " + prop + " proprty to a number should throw.");
}

function testRange(obj, prop, low, high) {
  assert.throws(function() {
    cue[prop] = low;
  }, null, "Setting " + (typeof obj) + "'s " + prop + " property to " + low + " should throw.");
  assert.throws(function() {
    cue[prop] = high;
  }, null, "Setting " + (typeof obj) + "'s " + prop + " property to " + high + " should throw.");
}

describe("VTT DOM shim tests", function() {

  it("vttcue", function() {
    var cue = new VTTCue(1, 2, "This is test.");
    ("startTime endTime text region " +
     "vertical snapToLines line lineAlign " +
     "position positionAlign size align " +
     "displayState").split(" ").forEach(function(prop) {
       assert.ok(cue.hasOwnProperty(prop), "VTTCue should have the " + prop + " property.");
    });

   testEnum(cue, "align", [ "start", "left", "middle", "right", "end" ]);
   testEnum(cue, "lineAlign", [ "start", "middle", "end" ]);
   testEnum(cue, "positionAlign", [ "start", "middle", "end" ]);
   testEnum(cue, "vertical", [ "", "lr", "rl" ]);

    assert.throws(function() {
      cue.line = "test";
    }, null, "Setting cue.line to 'test' should throw.");
    cue.line = "auto";
    assert.equal(cue.line, "auto", "Setting cue.line to auto should work.");

    testRange(cue, "position", -1, 101);
    testRange(cue, "size", -1, 101);
  });

  it("vttregion", function() {
    var region = new VTTRegion();
    ("width lines regionAnchorY regionAnchorX " +
     "viewportAnchorY viewportAnchorX scroll").split(" ").forEach(function(prop) {
       assert.ok(region.hasOwnProperty(prop), "VTTRegion should have the " + prop + "property");
    });

    testEnum(region, "scroll", [ "", "up" ]);
    testRange(region, "regionAnchorX", -1, 101);
    testRange(region, "regionAnchorY", -1, 101);
    testRange(region, "viewportAnchorX", -1, 101);
    testRange(region, "viewportAnchorY", -1, 101);
  });

});
