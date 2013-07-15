vtt.js
======

[![Build Status](https://travis-ci.org/andreasgal/vtt.js.png?branch=master)](https://travis-ci.org/andreasgal/vtt.js)

WebVTT parser in JavaScript.

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
parser.convertCueToDOMTree(window, input);
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

To run tests locally, use node.js. Start by installing the necessary test dependencies:

```
$ npm install
```

To actually run the tests, do the following:

```
$ npm test
```

###Writing Tests###

Currently to write tests you need two things: 1) a WebVTT file to parse and 2) a JSON file representing
the parsed data of the file, OR a node.js file with custom asserts using [Tape asserts](https://npmjs.org/package/tape).

####JSON-based Tests####

For example your WebVTT file could look like:

```
WEBVTT

00:32.500 --> 00:33.500 align:start size:50%
<v.loud Mary>That's awesome!
```

If you choose to use JSON it might look like:

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

If you use JSON you **must** define all the possible values even if they are
not being tested. Put the default values in this case.

**NOTE**: you can automatically generate a JSON file for a given `.vtt` file using `cue2json.js`.
Given a file like `tests/foo/bar.vtt`, you can generate `tests/foo/bar.json` like this:

```
$ ./tests/util/cue2json.js tests/foo/bar.vtt > tests/foo/bar.json
```

Assuming the parser is able to correctly parse `tests/foo/bar.vtt`, the file `tests/foo/bar.json`
now contains the correct JSON for creating a cue test.

####JS-based Tests####

Sometimes comparing the parsed cues to JSON isn't flexible enough. In such cases, you can use JavaScript
assertions. To do so, write a JavaScript file that exports a single function of the form `function(vtt, t)`,
where `vtt` is the fully parsed result (e.g., `{ cues: [...], errors: [...] }`) created by the parser,
and `t` is a test object, with [Tape test assertion functions](https://github.com/substack/tape/blob/master/lib/test.js)
available for you to use.

For the file specified earlier, a set of JavaScript based assertions might look like this:

```javascript
module.exports = function(vtt, t) {
  t.equal(vtt.cues.length, 1);
  t.equal(vtt.cues[0].content, "<v.loud Mary>That's awesome!");
  //...
  t.end();
}
```

####test.list manifests####

Once you have a JSON or JavaScript based test, you will need to add an entry to a ```test.list``` file
in the directory where the two files live. You will have to create this file if it
does not exist yet. The directory above it must also have an include line pointing to
the subdirectory's ```test.list``` file.

For example if ```simple.vtt``` and ```simple.json``` live in the ```test/simple``` directory
then your ```test.list``` file would be placed  in the ```test/simple/``` directory and the file would
look like:

```
simple.vtt simple.json
```

And the ```test``` directory's ```test.list``` file must have a new entry pointing to this
new ```test.list``` file like:

```
include simple/test.file
```

Your test is now good to go.
