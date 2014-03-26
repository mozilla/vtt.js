var TestRunner = require("../../test-runner.js"),
    test = new TestRunner();

describe("cuetext/languages tests", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("arabic.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/arabic.vtt", "cuetext/languages/arabic.json", onDone);
  });

  it("chinese.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/chinese.vtt", "cuetext/languages/chinese.json", onDone);
  });

  it("greek.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/greek.vtt", "cuetext/languages/greek.json", onDone);
  });

  it("hebrew.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/hebrew.vtt", "cuetext/languages/hebrew.json", onDone);
  });

  it("japanese.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/japanese.vtt", "cuetext/languages/japanese.json", onDone);
  });

  it("korean.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/korean.vtt", "cuetext/languages/korean.json", onDone);
  });

  it("long_string_arabic.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_arabic.vtt", "cuetext/languages/long_string_arabic.json", onDone);
  });

  it("long_string_chinese.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_chinese.vtt", "cuetext/languages/long_string_chinese.json", onDone);
  });

  it("long_string_greek.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_greek.vtt", "cuetext/languages/long_string_greek.json", onDone);
  });

  it("long_string_hebrew.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_hebrew.vtt", "cuetext/languages/long_string_hebrew.json", onDone);
  });

  it("long_string_japanese.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_japanese.vtt", "cuetext/languages/long_string_japanese.json", onDone);
  });

  it("long_string_korean.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_korean.vtt", "cuetext/languages/long_string_korean.json", onDone);
  });

  it("long_string_multiple_languages.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_multiple_languages.vtt", "cuetext/languages/long_string_multiple_languages.json", onDone);
  });

  it("long_string_russian.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_russian.vtt", "cuetext/languages/long_string_russian.json", onDone);
  });

  it("long_string_thai.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_thai.vtt", "cuetext/languages/long_string_thai.json", onDone);
  });

  it("multiple_languages.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/multiple_languages.vtt", "cuetext/languages/multiple_languages.json", onDone);
  });

  it("russian.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/russian.vtt", "cuetext/languages/russian.json", onDone);
  });

  it("thai.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/thai.vtt", "cuetext/languages/thai.json", onDone);
  });

  it("junk_characters.vtt", function(onDone){
    test.jsonEqualAll("cuetext/languages/junk_characters.vtt", "cuetext/languages/junk_characters.json", onDone);
  });

  it("long_string_junk_characters.vtt", function(onDone){
    test.jsonEqual("cuetext/languages/long_string_junk_characters.vtt", "cuetext/languages/long_string_junk_characters.json", onDone);
  });

});
