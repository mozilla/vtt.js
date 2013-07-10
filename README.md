vtt.js
======

WebVTT parser in JavaScript.

API
===

The parser has a simple request-like API:

```javascript
var parser = new WebVTTParser();
parser.oncue = function (cue) {
}
parser.onerror = function (msg) {
}
parser.onflush = function () {
}
parser.parse(moreData);
parser.parse(moreData);
parser.flush();
```

`parse()` hands an UTF8 string to the parser, encoded as JavaScript string (only using `\x00-\xff`). The parser properly reassembles partial data, even across line breaks.

`flush()` indicates that no more data is expected and will trigger 'onflush' (see below).

`oncue` is invoked for every cue that is parsed, and might be invoked repeatedly with the same cue object in case additional streaming updates are received to the cue.

`onerror` is invoked when a parser error occurs. When parsing cues, oncue will be invoked if a partial cue was parsed successfully before 'onerror' is invoked.

`onflush` is invoked in response to flush() and after the content was parsed completely.
