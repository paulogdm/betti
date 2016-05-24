var passport = require('passport');
var	LocalStrategy = require('passport-local').Strategy;
var	bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password'
	},
	function(login, password, done) {
		User.find({login:login}).exec(function(err, user) {

			sails.log.debug("[passport.js] Login request:\t" + login);

			if (err) {
				sails.log.debug("[passport.js] Query error:\t" + login);

				return done(null, err);
			}
			if (!user || user.length < 1) {

				sails.log.debug("[passport.js] No user found:\t" + login);

				return done(null, false, {
					message: 'Incorrect User'
				});
			}

			if(password === user[0].password){
				sails.log.debug("[passport.js] Acess granted to:\t" + login);
				return done(null,user);
			} else {
				sails.log.debug("[passport.js] Wrong password of:\t" + login);
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
