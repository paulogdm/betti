var user = require('../models/User.js');

var DEF_USER_PHOTO = '/images/views/profile_default.png';
var DEF_COVER_PHOTO = '/images/views/cover_default.png';

module.exports = {

	getProfile: function(login, requester, cb){

		if(user.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'select webuser.uname, webuser.birthday, webuser.uphoto,'+
		' webuser.ucover, webuser.motto, webuser.login, webuser.style_profile, '+
		'webuser.style_bar '+
		'from webuser where webuser.login = \''+login+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[profile.js][getProfile] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}

			if (!result || result.rowCount < 1) {

				sails.log.debug("[profile.js][getProfile] No user found:\t" + login);

				return cb(null, false, {
					message: 'Incorrect User'
				});
			}
			
			if(result.rows[0].ucover == null)
				result.rows[0].ucover = DEF_COVER_PHOTO;

			if(result.rows[0].uphoto == null)
				result.rows[0].uphoto = DEF_USER_PHOTO;

			return cb(null, result.rows[0]);
		});
	},

	getProfile: function(login, requester, cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();

				if(!login)
					login = requester;

				var pgquery = 'select webuser.uname, webuser.birthday, webuser.uphoto,'+
				' webuser.ucover, webuser.motto, webuser.login, webuser.style_profile, '+
				'webuser.style_bar '+
				'from webuser where ' +
				'webuser.login = \''+login+'\'';

				User.query(pgquery, function(err, result){
					if (err) {
						sails.log.debug("[profile.js][getProfile] Query error:\t" + requester);
						sails.log.debug(JSON.stringify(result));

						return cb(null, err);
					}

					if (!result || result.rowCount < 1) {

						sails.log.debug("[profile.js][getProfile] No user found:\t" + requester);

						return cb(null, false, {
							message: 'Incorrect User'
						});
					}

					if(result.rows[0].ucover == null)
						result.rows[0].ucover = DEF_COVER_PHOTO;

					if(result.rows[0].uphoto == null)
						result.rows[0].uphoto = DEF_USER_PHOTO;

					return cb(null, result.rows[0]);
				});
			}
		});
	},

	getNameAndPhoto: function(login, cb){

		if(user.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'select webuser.uname, webuser.uphoto from webuser where ' +
		'webuser.login = \''+login+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[profile.js][getNameAndPhoto] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}

			if (!result || result.rowCount < 1) {

				sails.log.debug("[profile.js][getNameAndPhoto] No user found:\t" + login);

				return cb(null, false, {
					message: 'invalid'
				});
			}
				
			if(result.rows[0].uphoto == null)
				result.rows[0].uphoto = user.DEF_USER_PHOTO;

			return cb(null, result.rows[0]);
		});
	},

	setPhoto: function(login, path, cb){

		if(user.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'UPDATE webuser SET uphoto = \''+path+'\' WHERE'
		+ ' login = \''+login+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[profile.js][setPhoto] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}

			if (!result || result.rowCount < 1) {

				sails.log.debug("[profile.js][setPhoto] No user found:\t" + login);

				return cb(null, false, {
					message: 'invalid'
				});
			}
			
			return cb(null, true, {
				message: 'invalid'
			});
		});
	}
}
