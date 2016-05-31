var user = require('../models/User.js');

module.exports = {

	getProfile: function(login, cb){

		if(user.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'select webuser.uname, webuser.birthday, webuser.uphoto,'+
		' webuser.ucover, webuser.motto, webuser.style_profile from webuser where ' +
		'webuser.login = \''+login+'\'';

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
				result.rows[0].ucover = user.DEF_COVER_PHOTO;

			if(result.rows[0].uphoto == null)
				result.rows[0].uphoto = user.DEF_USER_PHOTO;

			return cb(null, result.rows[0]);
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
