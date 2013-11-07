// Parse the data (i.e., file is already read into `data`), potentially
// splitting parsing into two chunks at `chunkAt`. Leave `chunkAt`
// undefined to parse file whole. The `decoder` is how we'll decode the
// data (null means use default TextDecoder). If `runProcModel` is set
// to true then it will run the processing model over each indivual cue
// as well and attach the output to the cue.
function parse(data, decoder, chunkAt) {
  var result = {
    regions: [],
    cues: []
  };
  chunkAt = !!chunkAt ? Math.min(chunkAt, data.length) : 0;

  var p = new WebVTTParser(window, decoder);
  p.oncue = function(cue) {
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

// Make sure the passed object is in JSON form.
function jsonify(object) {
  return JSON.parse(JSON.stringify(object));
}

// Parse the data and return it as JSON.
function parseToJson(data, decoder, chunkAt) {
  return jsonify(parse(data, decoder, chunkAt));
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


// The properties on DOM objects that we care about testing.
var testProperties = ( "localName tagName className textContent" +
                       " lang target data title" ).split(" ");

// Grab only the properties that we care about off an HTMLElement.
function filterElement(element) {
  var result = {};

  testProperties.forEach(function(prop) {
    if (_.has(element, prop)) {
      result[prop] = element[prop];
    }
  });

  if (_.has(element, "style")) {
    result.style = {};
    for (var i = 0, l = element.style.length; i < l; i++) {
      var prop = element.style[i];
      result.style[prop] = element.style[prop];
    }
  }

  if (_.has(element, "childNodes")) {
    result.childNodes = [];
    for (var x = 0, y = element.childNodes.length; x < y; x++) {
      result.childNodes.push(filterElement(element.childNodes[x]));
    }
  }

  return result;
}

// Run the processing model over parsed VTT data and compare it to a JSON
// representation of the correct output.
chai.assert.procModelEquals = function(vttFilename, jsonFilename, onFinish) {
  if (jsonFilename instanceof Function) {
    onFinish = jsonFilename;
    jsonFilename = null;
  }

  requestFileData(vttFilename, jsonFilename, function(err, data) {
    if (err) {
      fail("Unable to get the test resources: " + err);
      return onFinish();
    }

    var uint8Data = jsonToUint8Array(data.vtt.uint8),
        vttData = parse(uint8Data);

    divs = WebVTTParser.processCues(window, vttData.cues, vttData.regions);
    divs = divs.map(function(div) {
      return filterElement(div);
    });

    var json = jsonify(divs);
    if (!deepEqual(json, data.json)) {
      fail("running processing model over parsed output");
    }

    assert.ok(true, "Compare processing model results from " + vttFilename +
                    " to " + jsonFilename);
  });
};

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
        json = parseToJson(uint8Data);

    if (!deepEqual(json, data.json)) {
      fail("parsing file as binary utf8 without streaming");
    }

    var size = data.vtt.uint8.length;
    // Now check again using streaming with different chunk sizes
    while (--size >= 3) {
      json = parseToJson(uint8Data, null, size);
      if (!deepEqual(json, data.json)) {
        var chunk1 = (new Buffer(data.subarray(0,size))).toString();
        var chunk2 = (new Buffer(data.subarray(size))).toString();
        var chunk = "chunk1=/" + chunk1 + "/\n\nchunk2=/" + chunk2 + "/";
        return fail(chunk + " parsing file as binary utf8 with streaming, " +
                    " chunk size=" + size + "(" + total + ")");
      }
    }

    // Finally, check it using a StringDecoder
    json = parseToJson(data.vtt.string, WebVTTParser.StringDecoder());
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
