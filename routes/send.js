var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('static'))

var smtpTransport = nodemailer.createTransport({
  service: "sendgrid",
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/* Ruta za primanje forme i slanje emailaa */
app.post('/', (req, res) => {
  var email_body = "<b>Sender name:</b> " + req.body.name + "<br><b>Sender email: </b>" + req.body.email;
  email_body += "<br><b>Email subject:</b> " + req.body.subject + "<br><b>Email message:</b><br>" + req.body.message;


  var mailOption = {
    to : "info@bonsai.hr",
    subject : "Email from bonsai.hr",
    html: email_body
  }

  smtpTransport.sendMail(mailOption, (error, response) => {
    if(error){
      console.log(error);
      res.status(500).send("error while sending");
    }
    else{
      console.log("Message sent!");
      res.send({result:"success"});
    }
  });
});

module.exports = app;
