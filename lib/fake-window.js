// This implements a minimum fake window object constructor that is sufficient
// to test constructing a DOM Tree for cue content.

function Node() {
  this.childNodes = [];
}

Node.prototype.appendChild = function(node) {
  this.childNodes.push(node);
  node.parentNode = this;
};

function Element() {
  Node.call(this);
  this.style = {};
}
Element.prototype = Object.create(Node.prototype);
Element.prototype.constructor = Element;

function Document() {
  var body = new Element();
}

Document.prototype.createElement = function(tagName) {
  var element = new Element();
  element.tagName = tagName;
  return element;
};

Document.prototype.createTextNode = function(text) {
  return {
    textContent: text
  };
};

Document.prototype.createProcessingInstruction = function(target, data) {
    var node = new Node();
    node.target = target;
    node.data = data;
    return node;
};

module.exports = {
  DocumentFragment: Node,
  document: new Document(),
  VTTCue: require("./vttcue.js").VTTCue,
  VTTRegion: require("./vttregion.js").VTTRegion
};
