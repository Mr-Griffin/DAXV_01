var express = require('express');
var	app = express();
var	bodyParser = require('body-parser');
var	expressValidator = require('express-validator');
var User = require('../models/user');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// using validator
app.use(expressValidator());

/**
 * path /users/login
 * method GET
 */
app.get('/login', function(req, res) {
    res.render('login', {title: 'Login', errors:''});
});

/**
 * path /users/login
 * method POST
 */
app.post('/login', function(req, res){
    var username = req.body.username,
        password = req.body.password;

    User.findOne({username: username, password: password}, function(err, user){
        if(err) res.redirect('/users/register');
        console.log(user);
        if(user == null){
            res.render('login', {title: 'Login Error', errors:'Username or Password wrong'});
        }else{
            res.redirect('/');
        }
    });
});

/**
 * path /users/register
 * method GET
 */
app.get('/register', function(req, res) {
    res.render('register', {title: 'Register',  errors:'' });
});

/**
 * path /users/register
 * method POST
 */
app.post('/register', function(req, res){
    var username = req.body.username,
        email = req.body.email,
        password = req.body.password,
        confirmPassword = req.body.password2;

    //check validation
    req.checkBody("username", "Enter a valid username.").notEmpty();
    req.checkBody("email", "Enter a valid email address.").isEmail();
    req.checkBody("password", "Enter a valid password.").notEmpty();
    // req.checkBody("password2", "Confirm Password not match.");

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.render('register', {title: 'Register', errors: errors });
    }else{
        var user = new User({
            username: username,
            password: password,
            email: email
        });
        user.save(function(err){
            if (err) throw err;
            console.log('Register successfully');
            res.redirect('/users/login')
        });
    }
});

module.exports = app;