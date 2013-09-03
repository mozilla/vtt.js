var util = require("../../../lib/util.js"),
    assert = util.assert;

describe("cuetext/languages tests", function(){

  it.skip("arabic.vtt", function(){
    assert.jsonEqual("cuetext/languages/arabic.vtt", "cuetext/languages/arabic.json");
  });

  it.skip("chinese.vtt", function(){
    assert.jsonEqual("cuetext/languages/chinese.vtt", "cuetext/languages/chinese.json");
  });

  it.skip("greek.vtt", function(){
    assert.jsonEqual("cuetext/languages/greek.vtt", "cuetext/languages/greek.json");
  });

  it.skip("hebrew.vtt", function(){
    assert.jsonEqual("cuetext/languages/hebrew.vtt", "cuetext/languages/hebrew.json");
  });

  it.skip("japanese.vtt", function(){
    assert.jsonEqual("cuetext/languages/japanese.vtt", "cuetext/languages/japanese.json");
  });

  it.skip("korean.vtt", function(){
    assert.jsonEqual("cuetext/languages/korean.vtt", "cuetext/languages/korean.json");
  });

  it.skip("long_string_arabic.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_arabic.vtt", "cuetext/languages/long_string_arabic.json");
  });

  it.skip("long_string_chinese.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_chinese.vtt", "cuetext/languages/long_string_chinese.json");
  });

  it.skip("long_string_greek.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_greek.vtt", "cuetext/languages/long_string_greek.json");
  });

  it.skip("long_string_hebrew.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_hebrew.vtt", "cuetext/languages/long_string_hebrew.json");
  });

  it.skip("long_string_japanese.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_japanese.vtt", "cuetext/languages/long_string_japanese.json");
  });

  it.skip("long_string_korean.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_korean.vtt", "cuetext/languages/long_string_korean.json");
  });

  it.skip("long_string_multiple_languages.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_multiple_languages.vtt", "cuetext/languages/long_string_multiple_languages.json");
  });

  it.skip("long_string_russian.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_russian.vtt", "cuetext/languages/long_string_russian.json");
  });

  it.skip("long_string_thai.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_thai.vtt", "cuetext/languages/long_string_thai.json");
  });

  it.skip("multiple_languages.vtt", function(){
    assert.jsonEqual("cuetext/languages/multiple_languages.vtt", "cuetext/languages/multiple_languages.json");
  });

  it.skip("russian.vtt", function(){
    assert.jsonEqual("cuetext/languages/russian.vtt", "cuetext/languages/russian.json");
  });

  it.skip("thai.vtt", function(){
    assert.jsonEqual("cuetext/languages/thai.vtt", "cuetext/languages/thai.json");
  });

  it.skip("junk_characters.vtt", function(){
    assert.jsonEqual("cuetext/languages/junk_characters.vtt", "cuetext/languages/junk_characters.json");
  });

  it.skip("long_string_junk_characters.vtt", function(){
    assert.jsonEqual("cuetext/languages/long_string_junk_characters.vtt", "cuetext/languages/long_string_junk_characters.json");
  });

});
