var express = require('express'); 
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

var mjAPI = require("mathjax-node/lib/main.js");
mjAPI.config({ extensions : "TeX/AMScd.js" })
mjAPI.start();
app.get('/', function (req, res) {
  mjAPI.typeset({
    math: "\\Gamma(z) = \\int_0^\\infty t^{z-1}",
    inputs: ["TeX"],
    svg:true
  }, function (result) {
    res.send(result.svg);
  });
});
app.post('/', jsonParser, function (req, res) {
  console.log(req.body.math);
  mjAPI.typeset({
    math: req.body.math,
    inputs: ["inline-TeX"],
    svg:true
  }, function (result) {
    res.send(result.svg);
  });
});
var server = app.listen(6174, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});