var express = require('express');
var router = express.Router();

module.exports = function(passport){

    //login requeset
    router.post('/login', passport.authenticate('local-login',{
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash : true // allow flash messages
    }));

    //signup request
    router.post('/register', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash : true // allow flash messages
    }));

    //logout request
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/login', function(req, res) {
        res.render('login', {title: 'Login', success: false, message: req.flash('loginMessage')});
    });

    router.get('/register', function(req, res) {
        res.render('register', {title: 'Register',  success: false, message: req.flash('registerMessage')});
    });

    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    return router;
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
