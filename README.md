vtt.js
======

[![Build Status](https://travis-ci.org/mozilla/vtt.js.png?branch=master)](https://travis-ci.org/mozilla/vtt.js)

Implementation of the [WebVTT](https://developer.mozilla.org/en-US/docs/HTML/WebVTT) spec in JavaScript. Can be used
in NodeJS, on the browser, and many other places. Mozilla uses this implementation for parsing and processing WebVTT
files in Firefox/Gecko.

##Table of Contents##

- [Spec Compliance](#spec-compliance)
- [API](#api)
  - [parse](#parse)
  - [flush](#flush)
  - [onregion](#onregion)
  - [oncue](#oncue)
  - [onflush](#onflush)
  - [convertCueToDOMTree](#convertCueToDOMTree)
  - [processCues](#processCues)
- [Browser](#browser)
  - [Building Yourself](#building-yourself)
  - [Bower](#bower)
  - [Usage](#usage)
- [Tests](#tests)
  - [Writing Tests](#writing-tests)
  - [Cue2json](#cue2json)
- [Running On Node](#nodevtt)
  - [Require vtt.js Directly](#require-vttjs-directly)
  - [Require NodeVTT](#require-the-nodevtt-module)


Spec Compliance
===============

- [Parsing](http://dev.w3.org/html5/webvtt/#webvtt-file-format-parsing) (Completed)
  - [File](http://dev.w3.org/html5/webvtt/#webvtt-file-parsing) (Completed)
  - [Region](http://dev.w3.org/html5/webvtt/#webvtt-region-settings-parsing) (Completed)
  - [Cue Timings and Settings](http://dev.w3.org/html5/webvtt/#webvtt-cue-timings-and-settings-parsing) (Completed)
  - [WebVTT Cue Text](http://dev.w3.org/html5/webvtt/#dfn-webvtt-cue-text-parsing-rules) (Completed)
  - [Cue DOM Construction](http://dev.w3.org/html5/webvtt/#webvtt-cue-text-dom-construction-rules) (Completed)
- [Rendering](http://dev.w3.org/html5/webvtt/#rendering) (In Progress)
  - [Processing Model](http://dev.w3.org/html5/webvtt/#processing-model) (In Progress) ***Unstable VTTRegion Support***
    - [Apply WebVTT Cue Settings](http://dev.w3.org/html5/webvtt/#dfn-apply-webvtt-cue-settings) (In Progress)
      - Basic Positioning (Completed) ***Steps 1 - 9***
      - Overlap Avoidance (In Progress) ***Steps 11+***
  - [Applying CSS Properties](http://dev.w3.org/html5/webvtt/#applying-css-properties-to-webvtt-node-objects) (Completed)
  - [CSS Extensions](http://dev.w3.org/html5/webvtt/#css-extensions) (Not Implemented)
- [WebVTT API Shim](http://dev.w3.org/html5/webvtt/#webvtt-api-for-browsers) (In Progress)
  - [VTTCue](http://dev.w3.org/html5/webvtt/#vttcue-interface) (Completed)
  - [VTTRegion](http://dev.w3.org/html5/webvtt/#vttregion-interface) (Completed)
  - [VTTRegionList](http://dev.w3.org/html5/webvtt/#vttregionlist-interface) (Not Implemented)

API
===

The parser has a simple API:

```javascript
var parser = new WebVTTParser(window, stringDecoder);
parser.onregion = function (region) {}
parser.oncue = function (cue) {}
parser.onflush = function () {}
parser.parse(moreData);
parser.parse(moreData);
parser.flush();
WebVTTParser.convertCueToDOMTree(window, cuetext);
WebVTTParser.processCues(window, cues, regions);
```

The WebVTT constructor is passed a window object with which it will create new
VTTCues and VTTRegions as well as an optional StringDecoder object which
it will use to decode the data that the `parse()` function receives. For ease of
use, a StringDecoder is provided via `WebVTTParser.StringDecoder()`. If a custom
StringDecoder object is passed in it must support the API specified by the
[#whatwg string encoding](http://encoding.spec.whatwg.org/#api) spec.

####parse####

Hands data in some format to the parser for parsing. The passed data format
is expected to be decodable by the StringDecoder object that it has. The parser
decodes the data and reassembles partial data (streaming), even across line breaks.

```javascript
var parser = new WebVTTParser(window, WebVTTParser.StringDecoder());
parser.parse("WEBVTT\n\n");
parser.parse("00:32.500 --> 00:33.500 align:start size:50%\n");
parser.parse("<v.loud Mary>That's awesome!");
parser.flush();
```

####flush####

Indicates that no more data is expected and will trigger [onflush](#onFlush).

####onregion####

Callback that is invoked for every region that is correctly parsed. Returns a [VTTRegion](#http://dev.w3.org/html5/webvtt/#dfn-vttregion)
object.

```js
parse.onregion = function(region) {
  console.log(region);
};
```

####oncue####

Callback that is invoked for every cue that is fully parsed. In case of streaming parsing oncue is
delayed until the cue has been completely received. Returns a [VTTCue](#http://dev.w3.org/html5/webvtt/#vttcue-interface) object.

```js
parser.oncue = function(cue) {
  console.log(cue);
};
```

####onflush####

Is invoked in response to `flush()` and after the content was parsed completely.

####convertCueToDOMTree####

Parses the cue text handed to it into a tree of DOM nodes that mirrors the internal WebVTT node structure of
the cue text. It uses the window object handed to it to construct new HTMLElements and returns a tree of DOM
nodes attached to a top level div.

```javascript
var div = WebVTTParser.convertCueToDOMTree(window, cuetext);
```

####processCues####

Converts the cuetext of the cues passed to it to DOM trees&mdash;by calling convertCueToDOMTree&mdash;and
then runs the processing model steps of the WebVTT specification on the divs. The processing model applies the necessary
CSS styles to the cue divs to prepare them for display on the web page. It also converts the regions to divs, applies
CSS, and adds any of the cue divs which are attached to that region as children of the region divs.

```javascript
var divs = WebVTTParser.processCues(window, cues, regions);
```

Browser
=======

In order to use the parser in a browser, you need to get the built distribution of vtt.js. The distribution
contains polyfills for [TextDecoder](http://encoding.spec.whatwg.org/), [VTTCue](http://dev.w3.org/html5/webvtt/#vttcue-interface),
and [VTTRegion](http://dev.w3.org/html5/webvtt/#vttregion-interface) since not all browsers currently
support them.

###Building Yourself###

Building a browser-ready version of the library is done using `grunt` (if you haven't installed
`grunt` globally, you can run it from `./node_modules/.bin/grunt` after running `npm install`):

```
$ grunt build
Running "uglify:dist" (uglify) task
File "dist/vtt.min.js" created.

Done, without errors.
```

Your newly built vtt.js now lives in `dist/vtt.min.js`.

###Bower###

You can also get the a prebuilt distribution from [Bower](http://bower.io/). Either run the shell
command:

```
bower install vtt.js
```

Or include `vtt.js` as a dependency in your `bower.json` file. `vtt.js` should now
live in `bower_components/vtt.js/vtt.min.js`.

###Usage###

To use `vtt.js` you can just include the script on an HTML page like so:

```html
<html>
<head>
  <meta charset="utf-8">
  <title>vtt.js in the browser</title>
  <script src="bower_components/vtt.js/vtt.min.js"></script>
</head>
<body>
  <script>
    var vtt = "WEBVTT\n\nID\n00:00.000 --> 00:02.000\nText",
        parser = new WebVTTParser(window, WebVTTParser.StringDecoder());
    parser.oncue = function(cue) {
      console.log(cue);
    };
    parser.onregion = function(region) {
      console.log(region);
    }
    parser.parse(vtt);
    parser.flush();
  </script>
</body>
</html>
```

Tests
=====

Tests are written and run using [Mocha](http://visionmedia.github.io/mocha/) on node.js.
Before they can be run, you need to install various dependencies:

```
$ npm install
$ git submodule update --init --recursive
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

Tests are done by comparing live parsed output to a last-known-good JSON file. The JSON files
can be easily generated using the parser, so you don't need to write these by hand
(see details below about `cue2json`).

The first flavour of JSON based tests are tests that compare the parsed result of
a WebVTT file to a JSON representation of it. For example your WebVTT file could
look like this:

```
WEBVTT

00:32.500 --> 00:33.500 align:start size:50%
<v.loud Mary>That's awesome!
```

The associated JSON representation of the parsed file might look like this:

``` json
{
  "regions": [],
  "cues": [
    {
      "id": "",
      "startTime": 32.5,
      "endTime": 33.5,
      "text": "<v.loud Mary>That's awesome!",
      "regionId": "",
      "vertical": "",
      "line": "auto",
      "snapToLines": true,
      "size": 50,
      "align": "start",
      "position": 0,
    }
  ]
}
```

Writing the test to compare the live ouput to this JSON is done by creating a `.js` somewhere in `tests/`.
It might look like this:

```javascript
var TestRunner = require("../../lib/test-runner.js"),
    test = new TestRunner();

describe("foo/bar.vtt", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("should compare JSON to parsed result", function(onDone){
    test.jsonEqualAll("foo/bar.vtt", "foo/bar.json", onDone);
  });

});
```

The `jsonEqualAll` assertion does 2 kinds of checks, including:

* Parsing the specified file as UTF8 binary data without streaming (i.e., single call to `parse)
* Parsing the specified file as UTF8 binary data with streaming at every possible chunk size

The other style of JSON based tests are tests that check the processing model implementation rather then
the parser implementation. The processing model is the part of the WebVTT spec that prepares a number of
cues and regions to be displayed on the web page by converting their content to DOM trees and applying
CSS styling to them.

For example your WebVTT file could look like:

```
WEBVTT
Region: id=fred width=50% lines=3 regionanchor=0%,100% viewportanchor=10%,90% scroll=up

00:01.000 --> 00:02.000 region:fred
Is

00:01.000 --> 00:02.000
A
```

And the associated JSON representation of running the processing model over the cues and regions
contained within the WebVTT file could look like:

```json
[
  {
    "style": {
      "position": "absolute",
      "writingMode": "horizontal-tb",
      "backgroundColor": "rgba(0, 0, 0, 0.8)",
      "wordWrap": "break-word",
      "overflowWrap": "break-word",
      "font": "1.3vh/0.0533vh sans-serif",
      "lineHeight": "0.0533vh",
      "color": "rgba(255, 255, 255, 1)",
      "overflow": "hidden",
      "width": "50%",
      "minHeight": "0",
      "maxHeight": "0.1599px",
      "left": "10%",
      "top": "9.8401%",
      "display": "inline-flex",
      "flexFlow": "column",
      "justifyContent": "flex-end"
    },
    "tagName": "div",
    "childNodes": [
      {
        "style": {
          "left": 0,
          "width": "auto",
          "textAlign": "center",
          "position": "relative",
          "unicodeBidi": "plaintext"
        },
        "tagName": "div",
        "childNodes": [
          {
            "style": {},
            "textContent": "Is"
          }
        ]
      }
    ]
  },
  {
    "style": {
      "left": 0,
      "width": "100%",
      "textAlign": "center",
      "direction": "ltr",
      "writingMode": "horizontal-tb",
      "position": "absolute",
      "unicodeBidi": "plaintext",
      "font": "2.5vh sans-serif",
      "color": "rgba(255, 255, 255, 1)",
      "backgroundColor": "rgba(0, 0, 0, 0.8)",
      "whiteSpace": "pre-line"
    },
    "tagName": "div",
    "childNodes": [
      {
        "style": {},
        "textContent": "A"
      }
    ]
  }
]
```

Writing a test for this is similar to the JSON based tests that test the parser. You
would include a `.js` file somewhere in the `/tests` directory and use the
`assert.checkProcessingModel` function instead of `jsonEqual`.

```javascript
var TestRunner = require("../../lib/test-runner.js"),
    test = new TestRunner();

describe("foo/bar.vtt", function(){

  before(function(onDone) {
    test.init(onDone);
  });

  after(function() {
    test.shutdown();
  });

  it("should compare JSON to processed result", function(onDone){
    test.jsonEqualProcModel("foo/bar.vtt", "foo/bar.json", onDone);
  });

});
```

JSON based test `.js` files can live anywhere in or below `tests/`, and the test runner will find and run them.

####Cue2json####

You can automatically generate a JSON file for a given `.vtt` file using `cue2json.js`.
You have a number of options for running `cue2json.js`.

```
$ grunt build
$ Running "uglify:dist" (uglify) task
$ File "dist/vtt.min.js" created.
$ 
$ Done, without errors.
$ ./bin/cue2json.js 
$ Generate JSON test files from a reference VTT file.
$ Usage: node ./bin/cue2json.js [options]
$ 
$ Options:
$   -v, --vtt      Path to VTT file.                                                                                     
$   -d, --dir      Path to test directory. Will recursively find all JSON files with matching VTT files and rewrite them.
$   -c, --copy     Copies the VTT file to a JSON file with the same name.                                                
$   -p, --process  Generate a JSON file of the output returned from the processing model. 
```

**Note:** Cue2json will use the last built version of vtt.js so make sure to remember to rebuild it if you've made
changes to vtt.js since the last run.

`$ ./bin/cue2json.js -v tests/foo/bar.vtt` print the JSON representation of the parsed output of the WebVTT file to console.

`$ ./bin/cue2json.js -v tests/foo/bar.vtt -c` Same as above, but print the output to a JSON file with the name `tests/foo/bar.json`.

`$ ./bin/cue2json.js -v tests/foo/bar.vtt > tests/foo/bar-bad.json` print JSON output to a file called `tests/foo/bar-bad.json`.

`$ ./bin/cue2json.js -v tests/foo/bar.vtt -p` print JSON representation of running the processing model on the WebVTT file to console.

`$ ./bin/cue2json.js -v tests/foo/bar.vtt -cp` Same as above, but print it to a file named `tests/foo/bar.json`.

`$ ./bin/cue2json.js -d ./tests` walk the `tests` directory and rewrite any JSON files whose WebVTT source files are known i.e. there
is a corresponding WebVTT file with the same name as the JSON file found.

`$ ./bin/cue2json.js -d ./tests -p` Same as above, but print the JSON generated from running the processing model.

Assuming the parser is able to correctly parse the vtt file(s), you now have the correct JSON to run
a JSON test.

**NOTE:** Since `cue2json` uses the actual parser to generate these JSON files there is the possibility that
the generated JSON will contain bugs. Therefore, always check the generated JSON files to check that the
parser actually parsed according to spec.

Running on Node
===============

If you'd like to run vtt.js from Node you have a few options.

###Require vtt.js Directly###

Require vtt.js just like you would a regular Node module and use it to parse WebVTT files. The one
draw back of this approach is that if you want to run the processing model part of WebVTT you need to
provide a TextDecoder and a window object that has a DOM and a CSS layout engine.

```js
var WebVTTParser = require("vtt.js").WebVTTParser,
    parser = new WebVTTParser(fakeOrRealWindow, textDecoder);
```

###Require the NodeVTT Module###

Require NodeVTT. NodeVTT runs vtt.js on a PhantomJS page so it has access to a full DOM and CSS layout
engine which means that you can run any part of the spec that you want.

```js
var NodeVTT = require("./lib/node-vtt"),
    parser = new NodeVTT();

parser.init(function() {
  parser.parseFile(file, function() {
    parser.flush(function() {
      console.log(parser.vtt);
    });
  });
});
```
