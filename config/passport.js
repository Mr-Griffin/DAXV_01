var User = require('../models/user');
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		console.log('serialize User: '+user.username);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user.username);
            done(err, user);
        });
    });

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, username, password, done){
    	User.findOne({'username': username}, function(err, user){
    		if(err){
    			return done(err);
    		}
    		// username does not exists
    		if(!user){
    			console.log('User not found with username: '+ username)
    			return done(null, false,  req.flash('loginMessage', 'Username not found.'));
    		}

    		if(!isValidPassword(user, password)){
    			console.log('Invalid password');
    			return done(null, false, req.flash('loginMessage', 'Invalid password.'));
    		}
    		return done(null, user);
    	});
    }
	));

	passport.use('local-register', new LocalStrategy({
		usernameField: 'username',
		emailField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, done, email){
		User.findOne({'username': username}, function(err, user){
			if(err){
				console.log('Error in SignUp: '+ err);
                return done(err);
			}
			if(user){
				console.log('User is exists');
				return done(null, false, req.flash('registerMessage', 'User is exists.'));
			}else{
				var newUser = new User();
				newUser.username = username;
				newUser.email = email;
				newUser.password = createHash(password);

				console.log('username: '+ newUser.username+'\t email: '+newUser.email);
				console.log('password: '+ newUser.password);
				newUser.save(function(err){
					if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                    }
                    console.log(newUser.username + ' Registration succesful');
                    return done(null, newUser);
				});
			}
		});
	}
	));



	var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
