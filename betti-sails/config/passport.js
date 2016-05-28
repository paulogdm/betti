var passport = require('passport');
var	LocalStrategy = require('passport-local').Strategy;
var	bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password'
	},
	function(login, password, done) {

		sails.log.debug("[passport.js] Login request:\t" + login);

		var pgquery = 'select webuser.password, webuser.login from webuser where' +
		'webuser.login like \''+login+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[passport.js] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));
				sails.log.debug("[passport.js] Query error:\t" + login);

				return done(null, err);
			}
			if (!result || result.rowCount < 1) {

				sails.log.debug("[passport.js] No user found:\t" + login);

				return done(null, false, {
					message: 'Incorrect User'
				});
			}
			
			var user_query 	= result.rows[0];
			var password_query 	= user_query.password;

			if(password === password_query){
				sails.log.debug("[passport.js] Acess granted to:\t" + login);
				return done(null, user_query);
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
