const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.use('/', express.static('views'));
app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/about-us', (req, res)=>{
  res.render('about');
});

app.get('/services', (req, res)=>{
  res.render('services');
});

app.get('/schedule', (req, res)=>{
  res.render('schedule');
});

app.get('/registration', (req, res)=>{
  res.render('registration');
});

app.post('/formProcess', urlencodedParser, (req, res)=>{
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var number = req.body.number;
  var email = req.body.email;
  var course = req.body.course;
  var date = req.body.date;
  var refer = req.body.find;

  //bases transport for mailer object
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false,
    port: 25,
    auth:{
      user: "cdaregister@gmail.com",
      pass: "416419416"
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  //extra settings for email
  let HelperOptions ={
    from: '"CDA Registration" <cdaregister@gmail.com',
    to: 'canadiandrivingacademy@gmail.com',
    subject: 'Student Registration',
    text: 'Name: ' + firstName + ' ' + lastName + '\n\nNumber: ' + number + '\n\nEmail: ' + email
    + '\n\nRequested Course: ' + course + '\n\nPreferred Date: ' + date + '\n\nHow Did you find us: ' + refer
  };

  //send mail here
  transporter.sendMail(HelperOptions, (error, info)=>{
    if(!error){
      res.redirect('/completed');
      res.status(200).send();
    }
    res.status(400).send();
  });
});

app.get('/completed', (req, res)=>{
    res.render('completed');
});

app.get('/testimonials', (req, res)=>{
  res.render('testimonials');
});

app.get('/questions', (req, res)=>{
  res.render('qna');
});

app.get('/contact-us', (req, res)=>{
  res.render('contact');
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
