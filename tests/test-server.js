var express = require("express"),
    app = express(),
    util = require("../lib/util.js");

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get("/vtt/:vtt", function(req, res) {
  util.getTestData(req.params.vtt, function(err, data) {
    if (err) {
      return res.send(err);
    }
    res.send(data);
  });
});

app.get("/vtt/:vtt/json/:json", function(req, res) {
  util.getTestData(req.params.vtt, req.params.json, function(err, data) {
    if (err) {
      return res.send(err);
    }
    res.send(data);
  });
});

app.listen(3001);
