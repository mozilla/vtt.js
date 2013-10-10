// This implements a minimum fake window object constructor that is sufficient
// to test constructing a DOM Tree for cue content.

function Node() {
  this.style = {};
  this.childNodes = [];
}

Node.prototype.appendChild = function(node) {
  this.childNodes.push(node);
  node.parentNode = this;
};

Node.prototype.getBoundingClientRect = function() {
  var style = this.style;

  if (!style.writingMode) {
    // If we haven't set a writing mode then this means we're just a generic
    // box we will assume that we are 100 by 100 pixels.
    return {
      left: 0,
      right: 100,
      top: 0,
      bottom: 100,
      width: 100,
      height: 100
    };
  }

  function getStyle(k, dflt) {
    return !(k in style) ? dflt : parseFloat(style[k]);
  }

  // Otherwise let's assume that we are a cue subtitle div in a box that is
  // 100 by 100 pixels.
  var width = getStyle("width", 10),
      height = getStyle("height", 10),
      left,
      top;

  switch (style.writingMode) {
  case "horizontal-tb":
    left = getStyle("left", 0);
    top = 90;
    break;
  case "vertical-lr":
    left = 0;
    top = getStyle("top", 0);
    break;
  case "vertical-rl":
    left = 100 - width;
    top = getStyle("top", 0);
    break;
  }

  return {
    left: left,
    right: 100 - left - width,
    top: top,
    bottom: 100 - top - height,
    width: width,
    height: height
  };
}

function Document() {
}

Document.createElement = function(tagName) {
  var node = new Node();
  node.tagName = tagName;
  return node;
};

Document.createTextNode = function(text) {
  var node = new Node();
  node.textContent = text;
  return node;
};

module.exports = {
  DocumentFragment: Node,
  document: Document,
  VTTCue: require("./vttcue.js").VTTCue,
  VTTRegion: require("./vttregion.js").VTTRegion,
  ProcessingInstruction: function() { return new Node(); }
};
