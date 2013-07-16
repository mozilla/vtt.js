// This implements a minimum fake window object constructor that is sufficient
// to test constructing a DOM Tree for cue content.

function Node() {
}

Node.prototype.appendChild = function(node) {
  this.childNodes = this.childNodes || [];
  this.childNodes.push(node);
  node.parentNode = this;
};

Node.prototype.createElement = function(tagName) {
  var node = new Node();
  node.tagName = tagName;
  return node;
};

Node.prototype.createTextNode = function(text) {
  var node = new Node();
  node.textContent = text;
  return node;
};

module.exports = function FakeWindow() {
  this.DocumentFragment = Node;
  this.ProcessingInstruction = function() {
    return new Node();
  };
};
