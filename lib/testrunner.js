mocha.ui('bdd');
mocha.reporter('html');
var assert = chai.assert;

var runTest = function(){
    mochaPhantomJS.run();
}
