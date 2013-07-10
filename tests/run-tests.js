/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

load("vtt.js");

function parse(file) {
  var text = snarf(file);
  var result = 0;
  try {
    var parser = new WebVTTParser();
    parser.oncue = function (cue) {
      if (result >= 0)
        ++result;
    }
    parser.onerror = function () {
      result = -1;
    }
    parser.parse(text);
    parser.flush();
  } catch (e) {
    result = -2;
  }
  return result;
}

function check(file, status, expected) {
  print(file + " " + ((status === expected) ? "PASS" : "FAIL"));
}

function test(file) {
  check(file, parse(file), (file.indexOf("fail-") !== -1) ? 1 : 0);
}

var TESTS = [
             "no-newline-at-end.vtt",
             "cue-identifier.vtt",
             "fail-bad-utf8.vtt",
             "many-comments.vtt",
             "one-line-comment.vtt",
             "example1.vtt",
             "line-breaks.vtt",
             "not-only-nested-cues.vtt",
             "only-nested-cues.vtt",
             "voice-spans.vtt"
];

for (var n in TESTS)
  test("tests/" + TESTS[n]);
