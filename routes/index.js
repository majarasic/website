var express = require('express');
var app = express();

app.get('/',function(req, res){
  res.sendfile('/../public/index.html');
});

module.exports = app;