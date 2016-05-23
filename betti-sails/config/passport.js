var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(login, password, done) {
		User.find({'login': login}).exec(function(err, user) {

			if (err) {
				console.error('ERR FETCH'); // #sublime save location
				return done(null, err);
			}
			if (!user || user.length != 1) {
				return done(null, false, {message: 'Incorrect User'});
			}

			if( password !== user[0].password ){
				return done(null, false, { message: 'Invalid Password' });
			} else {
				return done(null,user);
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
