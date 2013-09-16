// This implements a minimum fake window object constructor that is sufficient
// to test constructing a DOM Tree for cue content.

function Node() {
  this.style = {};
}

Node.prototype.appendChild = function(node) {
  this.childNodes = this.childNodes || [];
  this.childNodes.push(node);
  node.parentNode = this;
};

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
