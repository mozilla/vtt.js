mocha.ui('bdd');
mocha.reporter('html');
var assert = chai.assert;

document.addEventListener("DOMContentLoaded", function(event) {
  mochaPhantomJS.run();
});
