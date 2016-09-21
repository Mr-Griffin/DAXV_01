var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* GET users listing. */
app.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

app.post('/login', function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    var username = req.body.username;
    var passowrd = req.body.password;
    res.send('Username: ' + username + '  Password: ' + password);
});

app.get('/register', function (req, res, next) {
    res.render('register', {title: 'Register'});
});

app.post('/register', function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var passowrd = req.body.password;
    var passowrd2 = req.body.password2;
});

module.exports = app;
