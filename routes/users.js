var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* GET users listing. */
app.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

app.post('/login', function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Username: '+ req.body.username+'  Password: '+ req.body.password);
});

app.get('/register', function (req, res, next) {
  res.render('register', {title: 'Register'});
});

module.exports = app;
