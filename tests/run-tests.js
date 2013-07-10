/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

load("vtt.js");

function parse(file) {
  var text = snarf(file);
  var result = 0;
  try {
    var parser = new WebVTTParser();
    parser.onerror = function () {
      result = 1;
    }
    parser.parse(text);
  } catch (e) {
    result = 2;
  }
  return result;
}

function check(file, status, expected) {
  print(file + " " + ((status === expected) ? "PASS" : "FAIL"));
}

function test(file) {
  check(file, parse(file), (file.indexOf("fail-") !== -1) ? 1 : 0);
}

test("tests/example1.vtt");
test("tests/fail-bad-utf8.vtt");
