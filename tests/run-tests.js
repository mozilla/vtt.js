/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

if (typeof require !== "undefined") {
  // node.js, emulate jsshell funcs, use node-tap
  var WebVTTParser = require("../").WebVTTParser,
    fs = require("fs"),
    tap = require('tape');
    snarf = function(file) {
      return fs.readFileSync(file, "utf8");
    },
    print = function(){};
} else {
  // jsshell
  load("vtt.js");
}

const FAIL = -1;

function parse(callback, done) {
  var result = 0;
  var parser = new WebVTTParser();
  parser.oncue = function (cue) {
    if (callback && !callback(null, cue))
      result = FAIL;
    // Don't get tricked by a cue being reported multiple times for updates in
    // case of streaming parsing.
    if (!cue.seen && result >= 0)
      ++result;
    cue.seen = true;
  }
  parser.onerror = function (msg) {
    if (callback && !callback(msg, null))
      result = FAIL;
  }
  parser.onflush = function () {
    done && done(result);
  }
  return parser;
}

function handle_error(error) {
  print(error);
  return false;
}

function expect_line_num(num) {
  return function (error, cue) {
    return error ? handle_error(error) : (cue.content.split("\n").length === num);
  }
}

function expect_field(field, value) {
  return function (error, cue) {
    return error ? handle_error(error) : (cue[field] === value);
  }
}

function expect_fail(msg) {
  return function (error, cue) {
    if (!error)
      return true;
    if (error !== msg)
      handle_error(error);
    return error === msg;
  }
}

function report(name, expected) {
  return function (result) {
    // If we're node, format as TAP stream
    if (typeof require !== "undefined") {
      tap.test(name, function(t) {
        t.equal(result, expected);
        t.end();
      });
    } else {
      if (result !== expected)
        print("expected: " + expected + ", got: " + result);
      print(name + " " + ((result === expected) ? "PASS" : "FAIL"));
    }
  };
}

function checkAllAtOnce(file, expected, callback) {
  parse(callback, report(file, expected)).parse(snarf(file)).flush();
}

function checkStreaming(file, expected, callback) {
  var counter = 0;
  var text = snarf(file);
  for (var n = 0; n < text.length; ++n) {
    var parser = parse(callback, function (result) {
      if (result === expected)
        ++counter;
    });
    parser.parse(text.substr(0, n));
    parser.parse(text.substr(n));
    parser.flush();
  }
  report(file + " (streaming)", text.length)(counter);
}

function check(file, expected, callback) {
  checkAllAtOnce(file, expected, callback);
  checkStreaming(file, expected, callback);
}

check("tests/no-newline-at-end.vtt", 1);
check("tests/cue-identifier.vtt", 2);
check("tests/fail-bad-utf8.vtt", 1, expect_fail("invalid UTF8 encoding in '<v Roger Bingham>When we e-mailed—'"));
check("tests/many-comments.vtt", 2);
check("tests/one-line-comment.vtt", 2);
check("tests/example1.vtt", 13);
check("tests/line-breaks.vtt", 3);
check("tests/not-only-nested-cues.vtt", 2);
check("tests/only-nested-cues.vtt", 6);
check("tests/voice-spans.vtt", 4);
check("tests/long-line.vtt", 1, expect_line_num(1));
// We can't test streaming with this test since we get early callbacks with partial (single line) cue texts.
checkAllAtOnce("tests/two-lines.vtt", 1, expect_line_num(2));
check("tests/arrows.vtt", 1, expect_field("id", "- - > -- > - -> -- <--"));
check("tests/bold-spans.vtt", 4);
check("tests/underline-spans.vtt", 4);
check("tests/italic-spans.vtt", 4);
check("tests/class-spans.vtt", 4);
check("tests/lang-spans.vtt", 3);
check("tests/timestamp-spans.vtt", 3);
check("tests/escape-characters.vtt", 8);
check("tests/bad-tag-spans.vtt", 4);
check("tests/ruby-spans.vtt", 5);
check("tests/cue-settings-align.vtt", 13);
check("tests/cue-settings-vertical.vtt", 10);
check("tests/cue-settings-size.vtt", 11);
check("tests/cue-settings-position.vtt", 11);
check("tests/cue-settings-line-position.vtt", 15);
