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

'convertCueToDOMTree' parses the cuetext of the cue handed to it into a tree of DOM nodes that mirrors the internal WebVTT node structure of the cue's cuetext. Constructs a DocumentFragment with the window it is handed, adds the tree of DOM nodes as a child to the DocumentFragment, and returns it.

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

To run tests locally, use node.js:

```
$ npm install
$ npm test
```

###Writing Tests###

Currently to write tests you need two things. A WebVTT file to parse and a JSON file representing
the parsed data of the file or a Node.js file with custom asserts using [Tape asserts](https://npmjs.org/package/tape).

For example your WebVTT file could look like:

```
WEBVTT

ID
00:00.000 --> 00:02.000
Text
```

If you choose to use JSON it might look like:
``` json
{
  "cue": {
    "id": "",
    "settings": {
      "region": "",
      "vertical": "",
      "line": "auto",
      "position": "50%",
      "size": "100%",
      "align": "middle"
    },
    "startTime": "000000000",
    "endTime": "000002000",
    "content": "Text"
  },
  "domTree": {
    "childNodes": [{
      "tagName": "span",
      "localName": "v",
      "title": "Mary",
      "className": "loud",
      "childNodes": [{
        "textContent": "Text"
      }]
    }]
  }
}
```
If you use JSON you **must** define all the possible values even if they are
not being tested. Put the default values in this case.

If you choose to use Node.js it might look like:

``` js
exports.test = function(vtt, t) {
  t.equal(vtt.cues.length, 1);
  t.equal(vtt.cues[0].id, "ID");
  t.equal(vtt.cues[0].startTime, 0);
  t.equal(vtt.cues[0].endTime, 2);
  t.equal(vtt.cues[0].content, "Text");
  t.end();
}
```
Your Node.js file **must** export a test function with the signature ```function(vtt, t)```.

Once you have these two things you will need to add an entry to a ```test.list``` file
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

