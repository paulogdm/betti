var passport = require("passport");
var jwt = require('jsonwebtoken');

module.exports = {
	login: function (req, res) {
		passport.authenticate('local', function (err, user) {

			sails.log.debug("[Service][auth.js] Processing request of login...");

			if (!user) {
				res.send({
					success: false,
					message: 'invalidLogin'
				});
				return;
			} else {
				if (err) {
					res.send({
						success: false,
						message: 'unknownError',
						error: err
					});
				} else {
					sails.log.debug("[Service][auth.js] Token sent to\t" + user.login);
					var token = jwt.sign(user, sails.config.secret, {expiresIn: 60 * 24});
					
					//cookie???
					req.session.cookie.token = token;

					res.send({
						success: true,
						user: user,
						token: token
					});
				}
			}
		})(req, res);
	},
	
	isvalidtoken: function (req, res) {
		if (req.headers.authorization) {
			jwt.verify(req.headers.authorization.replace('Bearer ', ''), sails.config.secret, function (err, decoded) {
				if (err) return res.send({success: false});
				if (decoded) {
					return res.send({success: true, user: decoded[0]});
				}
			});
		} else {
			return res.send({success: false});
		}
	},

	tokendecode: function (token, cb) {
		if (token) {
			jwt.verify(token.replace('Bearer ', ''), sails.config.secret, function (err, decoded) {
				if (err) return cb({success: false, user: null});
				if (decoded) {
					return cb({success: true, user: decoded[0]});
				}
			});
		} else {
			return cb({success: false, user: null});
		}
	}
};
