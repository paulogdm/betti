/**
 * Webuser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var DEF_USER_PHOTO = '/images/views/profile_default.png';
var DEF_COVER_PHOTO = '/images/views/cover_default.png';


module.exports = {

	tableName: 'webuser',
	autoCreatedAt: false,
	autoUpdatedAt: false,

	attributes: {
		login : {
			type: 'string',
			primaryKey: true
		},
		uname : {
			type: 'string'
		},
		password : {
			type: 'string'
		},
		birthday : {
			type: 'date'
		},
		uphoto : {
			type: 'string'
		},
		ucover : {
			type: 'string'
		},
		motto : {
			type: 'string'
		},
		style_profile : {
			type: 'integer'
		},
		style_bar : {
			type: 'integer'
		}
	},

	//////////////////////////////
	// FUNCTIONS FOR USER MODEL //
	//////////////////////////////
	isReserved: function(login){
		reserved = ['admin', 'teste'];

		for (var i = reserved.length - 1; i >= 0; i--) {
			if(reserved[i] == login)
				return true;
		}

		return false;
	},


	getProfile: function(login, cb){

		if(this.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'select webuser.uname, webuser.birthday, webuser.uphoto,'+
		' webuser.ucover, webuser.motto, webuser.style_profile from webuser where ' +
		'webuser.login = \''+login+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[getProfile] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}

			if (!result || result.rowCount < 1) {

				sails.log.debug("[getProfile] No user found:\t" + login);

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

	getNameAndPhoto: function(login, cb){

		if(this.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'select webuser.uname, webuser.uphoto from webuser where ' +
		'webuser.login = \''+login+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[getNameAndPhoto] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}

			if (!result || result.rowCount < 1) {

				sails.log.debug("[getNameAndPhoto] No user found:\t" + login);

				return cb(null, false, {
					message: 'invalid'
				});
			}
				
			if(result.rows[0].uphoto == null)
				result.rows[0].uphoto = DEF_USER_PHOTO;

			return cb(null, result.rows[0]);
		});
	}/*,

	setPhoto: function(login, cb){

		if(this.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'UPDATE webuser SET uphoto = \''+NEW_PHOTO_PATH+'\' WHERE'
		+ ' login = \''+CURRENT_USER_LOGIN+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[setPhoto] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}

			if (!result || result.rowCount < 1) {

				sails.log.debug("[setPhoto] No user found:\t" + login);

				return cb(null, false, {
					message: 'invalid'
				});
			}
			
			return cb(null, true, {
				message: 'invalid'
			});
		});
	}*/
};

