vtt.js
======

[![Build Status](https://travis-ci.org/andreasgal/vtt.js.png?branch=master)](https://travis-ci.org/andreasgal/vtt.js)

[WebVTT](https://developer.mozilla.org/en-US/docs/HTML/WebVTT) parser in JavaScript.

API
===

The parser has a simple API:

```javascript
var parser = new WebVTTParser();
parser.onregion = function (region) {}
parser.oncue = function (cue) {}
parser.onpartialcue = function (cue) {}
parser.onerror = function (msg) {}
parser.onflush = function () {}
parser.parse(moreData);
parser.parse(moreData);
parser.flush();
parser.convertCueToDOMTree(window, cue);
```

`parse` hands an UTF8 string to the parser, encoded as JavaScript string (only using `\x00-\xff`). The parser properly reassembles partial data, even across line breaks.

```convertCueToDOMTree``` parses the cuetext of the cue handed to it into a tree of DOM nodes that mirrors the internal WebVTT node structure of the cue's cuetext. Constructs a DocumentFragment with the window it is handed, adds the tree of DOM nodes as a child to the DocumentFragment, and returns it.

`flush` indicates that no more data is expected and will trigger 'onflush' (see below).

`onregion` is invoked for every region that was fully parsed.

`oncue` is invoked for every cue that was fully parsed. In case of streaming parsing oncue is delayed until the cue has been completely received.

`onpartialcue` is invoked as a cue is received, and might be invoked with a cue object that only contains partial content, and might be invoked repeatedly with the same cue object in case additional streaming updates are received. After the cue was fully parsed, `oncue` will be triggered on the same cue object.

`onerror` is invoked when a parser error occurs. When parsing cues, oncue will be invoked if a partial cue was parsed successfully before 'onerror' is invoked.

`onflush` is invoked in response to flush() and after the content was parsed completely.

The content of individual cues can be converted into a `DocumentFragment` node using:

```javascript
var fragment = WebVTTParser.convertCueToDOMTree(window, cue);
```

Tests
=====

Tests are written and run using [Mocha](http://visionmedia.github.io/mocha/) on node.js.
Before they can be run, you need to install various dependencies:

```
$ npm install
```

To run all the tests, do the following:

```
$ npm test
```

If you want to run individual tests, you can install the [Mocha](http://visionmedia.github.io/mocha/) command-line
tool globally, and then run tests per-directory:

```
$ npm install -g mocha
$ cd tests/some/sub/dir
$ mocha .
```

See the [usage docs](http://visionmedia.github.io/mocha/#usage) for further usage info.

###Writing Tests###

Tests take one of two forms. Either a last-known-good JSON file is compared against a parsed .vtt file,
or custom JS assertions are run over a parsed .vtt file.

####JSON-based Tests####

JSON-based tests are useful for creating regression tests. The JSON files can be easily generated
using the parser, so you don't need to write these by hand (see details below about `cue2json`).

For example your WebVTT file could look like this:

```
WEBVTT

00:32.500 --> 00:33.500 align:start size:50%
<v.loud Mary>That's awesome!
```

The associated JSON representation might look like this:

``` json
{
  "id": "",
  "settings": {
    "region": "",
    "vertical": "",
    "line": "auto",
    "position": "50",
    "size": 50,
    "align": "start"
  },
  "startTime": "000032500",
  "endTime": "000033500",
  "content": "<v.loud Mary>That's awesome!",
  "domTree": {
    "childNodes": [
      {
        "tagName": "span",
        "localName": "v",
        "title": "Mary",
        "className": "loud",
        "childNodes": [
          {
            "textContent": "That's awesome!"
          }
        ]
      }
    ]
  }
}
```

If you use JSON you **must** define all the possible values for cue data even if they are
not being tested. Put the default values in this case. Values that exist under the "domTree"
of the parsed cue's cuetext can be left out if they are not there as the tree is generated
dynamically with no defaults for values that aren't in the cue's cuetext.

**NOTE**: you can automatically generate a JSON file for a given `.vtt` file using `cue2json.js`.
Given a file like `tests/foo/bar.vtt`, you can generate `tests/foo/bar.json` like this:

```
$ ./bin/cue2json.js tests/foo/bar.vtt > tests/foo/bar.json
```

Assuming the parser is able to correctly parse `tests/foo/bar.vtt`, the file `tests/foo/bar.json`
now contains the correct JSON for creating a cue test.

Writing the test to compare the live ouput to this JSON is done by creating a `.js` somewhere in `tests/`.
It might look like this:

```javascript
var util = require("../lib/util.js"),
    assert = util.assert;

describe("foo/bar.vtt", function(){

  it("should compare JSON to parsed result", function(){
    assert.jsonEqual("foo/bar.vtt", "foo/bar.json");
  });

});
```

Such `.js` files can live anywhere in or below `tests/`, and the test runner will find and run them.

####JS-based Tests####

Sometimes comparing the parsed cues to JSON isn't flexible enough. In such cases, you can use JavaScript
assertions. The `lib/util.js` module provides many helper functions and objects to make this easier,
for example, being able to `parse` a `.vtt` file and get back resulting cues.

```javascript
var util = require("../lib/util.js"),
    assert = util.assert;

describe("Simple VTT Tests", function(){

  it("should run JS assertions on parsed result", function(){
    var vtt = util.parse("simple.vtt");
    assert.equal(vtt.cues.length, 1);

    var cue0 = vtt.cues[0];
    assert.equal(cue0.id, "ID");
    assert.equal(cue0.startTime, "000000000");
    assert.equal(cue0.endTime, "000002000");
    assert.equal(cue0.content, "Text");
  });

});
```

The `util.assert` object is the standard [node.js assert module](http://nodejs.org/api/assert.html) with
the addition of `jsonEqual`. See `lib/util.js` for other testing API functions and objects.
