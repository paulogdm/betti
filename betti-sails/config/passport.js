var passport = require('passport');
var	LocalStrategy = require('passport-local').Strategy;
var	bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password'
	},
	function(login, password, done) {
		User.find({login:login}).exec(function(err, user) {

			sails.log.debug("Login requested to passport");

			if (err) {
				sails.log.debug(err);
				return done(null, err);
			}
			if (!user || user.length < 1) {
				return done(null, false, {
					message: 'Incorrect User'
				});
			}

			if(password === user[0].password){
				return done(null,user);
			} else {
				return done(null, false, {
					message: 'Invalid Password'
				});
			}
		});
	})
);

module.exports = {
	http: {
		customMiddleware: function(app) {
			app.use(passport.initialize());
			app.use(passport.session());
		}
	}
};
