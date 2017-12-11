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
  var email_body = "Sender name: " + req.body.name + "\nSender email: " + req.body.email;
  email_body += "\nEmail subject: " + req.body.subject + "\nEmail message:\n" + req.body.message;

  var mailOption = {
    to : "info@bonsai.hr",
    subject : "Email from bonsai.hr",
    text: email_body
  }

  smtpTransport.sendMail(mailOption, (error, response) => {
    if(error){
      console.log(error);
      res.send("error while sending");
    }
    else{
      console.log("Message sent!");
      res.send({result:"success"});
    }
  });
});

module.exports = app;
