// Parse the data (i.e., file is already read into `data`), potentially
// splitting parsing into two chunks at `chunkAt`. Leave `chunkAt`
// undefined to parse file whole. The `decoder` is how we'll decode the
// data (null means use default TextDecoder). If `runProcModel` is set
// to true then it will run the processing model over each indivual cue
// as well and attach the output to the cue.
function parse(data, decoder, chunkAt, runProcModel) {
  var result = {
    regions: [],
    cues: []
  };
  chunkAt = !!chunkAt ? Math.min(chunkAt, data.length) : 0;

  var p = new WebVTTParser(window, decoder);
  p.oncue = function(cue) {
    // Also parse the cue's content and run the cue through the processing
    // model.
    if (runProcModel) {
      cue.domTree = WebVTTParser.processCues(window, [cue])[0];
    }
    result.cues.push(cue);
  };
  p.onregion = function(region) {
    result.regions.push(region);
  };

  if (!chunkAt) {
    p.parse(data);
  } else {
    p.parse(data.subarray(0, chunkAt));
    p.parse(data.subarray(chunkAt));
  }
  p.flush();

  return result;
}

// Parse the data and return it as JSON.
function parseToJson(data, decoder, chunkAt, runProcModel) {
  return JSON.parse(JSON.stringify(parse(data, decoder, chunkAt,
                                         runProcModel)));
}

// Get the file data from the server for the specified VTT and JSON files.
function requestFileData(vttFilename, jsonFilename, onResponse) {
  var url = "http://localhost:3001/vtt/" + encodeURIComponent(vttFilename);
  if (jsonFilename) {
    url += "/json/" + encodeURIComponent(jsonFilename);
  }

  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      onResponse(null, data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      onResponse(textStatus);
    }
  });
}

function jsonToUint8Array(uint8Json) {
  var uint8Array = new Uint8Array(uint8Json.length);
  for (var i = 0, l = uint8Json.length; i < l; i++) {
    uint8Array[i] = uint8Json[i];
  }

  return uint8Array;
}

// Shorthand forms for various assets.
var assert = chai.assert,
    deepEqual = _.isEqual;

function fail(message) {
  assert.ok(false, message);
}

chai.assert.jsonEqual = function(vttFilename, jsonFilename, onFinish) {
  if (jsonFilename instanceof Function) {
    onFinish = jsonFilename;
    jsonFilename = null;
  }

  requestFileData(vttFilename, jsonFilename, function(err, data) {
    if (err) {
      fail("Unable to get the test resources: " + err);
      return onFinish();
    }

    // First check that things work when parsing the file as a whole.
    var uint8Data = jsonToUint8Array(data.vtt.uint8),
        json = parseToJson(uint8Data, null, null, false);

    if (!deepEqual(json, data.json)) {
      fail("parsing file as binary utf8 without streaming");
    }

    var size = data.vtt.uint8.length;
    // Now check again using streaming with different chunk sizes
    while (--size >= 3) {
      json = parseToJson(uint8Data, null, size, false);
      if (!deepEqual(json, data.json)) {
        var chunk1 = (new Buffer(data.subarray(0,size))).toString();
        var chunk2 = (new Buffer(data.subarray(size))).toString();
        var chunk = "chunk1=/" + chunk1 + "/\n\nchunk2=/" + chunk2 + "/";
        return fail(chunk + " parsing file as binary utf8 with streaming, " +
                    " chunk size=" + size + "(" + total + ")");
      }
    }

    // Finally, check it using a StringDecoder
    json = parseToJson(data.vtt.string, WebVTTParser.StringDecoder(), null,
                       false);
    if (!deepEqual(json, data.json)) {
      return fail("parsing file as string without streaming");
    }

    assert.ok(true, "Compare " + vttFilename + " to " + jsonFilename);
    return onFinish();
  });
};

// Start 'er up.
mocha.ui("bdd");
mocha.reporter("html");
document.addEventListener("DOMContentLoaded", function(event) {
  mochaPhantomJS.run();
});
