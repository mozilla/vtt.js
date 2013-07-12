vtt.js
======

[![Build Status](https://travis-ci.org/andreasgal/vtt.js.png?branch=master)](https://travis-ci.org/andreasgal/vtt.js)

WebVTT parser in JavaScript.

API
===

The parser has a simple request-like API:

```javascript
var parser = new WebVTTParser();
parser.onregion = function (region) {
}
parser.oncue = function (cue) {
}
parser.onpartialcue = function (cue) {
}
parser.onerror = function (msg) {
}
parser.onflush = function () {
}
parser.parse(moreData);
parser.parse(moreData);
parser.flush();
```

`parse` hands an UTF8 string to the parser, encoded as JavaScript string (only using `\x00-\xff`). The parser properly reassembles partial data, even across line breaks.

`flush` indicates that no more data is expected and will trigger 'onflush' (see below).

`onregion` is invoked for every region that was fully parsed.

`oncue` is invoked for every cue that was fully parsed. In case of streaming parsing oncue is delayed until the cue has been completely received.

`onpartialcue` is invoked as a cue is received, and might be invoked with a cue object that only contains partial content, and might be invoked repeatedly with the same cue object in case additional streaming updates are received. After the cue was fully parsed, `oncue` will be triggered on the same cue object.

`onerror` is invoked when a parser error occurs. When parsing cues, oncue will be invoked if a partial cue was parsed successfully before 'onerror' is invoked.

`onflush` is invoked in response to flush() and after the content was parsed completely.

Tests
=====

To run tests locally, use node.js:

```
$ npm install
$ npm test
```
