var express = require('express'); 
var bodyParser = require('body-parser');
var unescape = require('unescape')

var os = require('os');
if (os.platform() == 'win32') {  
    var chilkat = require('chilkat_node6_win32'); 
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('chilkat_node6_arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('chilkat_node6_linux32');
    } else {
        var chilkat = require('chilkat_node6_linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('chilkat_node6_macosx');
}

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
  // var sb = new chilkat.StringBuilder();
  // sb.Append(req.body.math)
  // sb.Decode("json","utf-8");
  // var json = sb.GetAsString();
  console.log(req.body.math);
  mjAPI.typeset({
    math: req.body.math,
    inputs: ["inline-TeX"],
    svg:true
  }, function (result) {
    res.send(result.svg);
  });
});
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});