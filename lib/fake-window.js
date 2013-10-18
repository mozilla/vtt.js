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

Document.createProcessingInstruction = function(target, data) {
    var node = new Node();
    node.target = target;
    node.data = data;
    return node;
};

module.exports = {
  DocumentFragment: Node,
  document: Document,
  VTTCue: require("./vttcue.js").VTTCue,
  VTTRegion: require("./vttregion.js").VTTRegion
};
