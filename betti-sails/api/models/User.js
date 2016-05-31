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

	beforeCreate: function (values, cb) {
		if(this.isReserved(values.login))
			return cb('reserved login')
		return cb();
  	}

};
