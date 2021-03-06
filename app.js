var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var expressValidator = require('express-validator');
var expresssession = require('express-session');
var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users')(passport);

var app = express();

//*************************************************************************************************
//connection database
mongoose.connect('mongodb://localhost/daxv01data', function (err) {
    if (err) {
        console.log('Could not connect to mongo');
    }
});
//*************************************************************************************************
app.use(expresssession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
}));
//*************************************************************************************************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
