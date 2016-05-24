var passport = require('passport');
var	LocalStrategy = require('passport-local').Strategy;
var	bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password'
	},
	function(username, password, done) {
		User.find({login:username}).exec(function(err, user) {

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

			bcrypt.compare(password, user[0].password, function(err, res) {
				if (err || !res) {
					return done(null, false, {
						message: 'Invalid Password'
					});
				} else {
					return done(null,user);
				}
			});
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
