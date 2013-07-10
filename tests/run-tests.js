/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

load("vtt.js");

const FAIL = -1;
const EXCEPTION = 2;

function parse(file, oncue) {
  var text = snarf(file);
  var result = 0;
  try {
    var parser = new WebVTTParser();
    parser.oncue = function (cue) {
      if (oncue && !oncue(cue))
        result = FAIL;
      if (result >= 0)
        ++result;
    }
    parser.onerror = function (msg) {
      print(msg);
      result = FAIL;
    }
    parser.parse(text);
    parser.flush();
  } catch (e) {
    result = EXCEPTION;
  }
  return result;
}

function expect_line_num(num) {
  return function (cue) {
    return cue.content.split("\n").length === num;
  }
}

function expect_field(field, value) {
  return function (cue) {
    return cue[field] === value;
  }
}

function check(file, expected, oncue) {
  print(file + " " + ((parse(file, oncue) === expected) ? "PASS" : "FAIL"));
}

check("tests/no-newline-at-end.vtt", 1);
check("tests/cue-identifier.vtt", 2);
check("tests/fail-bad-utf8.vtt", FAIL);
check("tests/many-comments.vtt", 2);
check("tests/one-line-comment.vtt", 2);
check("tests/example1.vtt", 13);
check("tests/line-breaks.vtt", 3);
check("tests/not-only-nested-cues.vtt", 2);
check("tests/only-nested-cues.vtt", 6);
check("tests/voice-spans.vtt", 4);
check("tests/long-line.vtt", 1, expect_line_num(1));
check("tests/two-lines.vtt", 1, expect_line_num(2));
check("tests/arrows.vtt", 1, expect_field("id", "- - > -- > - -> -- <--"));
