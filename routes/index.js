var express = require('express');
var app = express();

app.get('/',function(req, res){
  res.render('index');
});

app.get('/chatbots',function(req, res){
  res.render('chatbots');
});

module.exports = app;