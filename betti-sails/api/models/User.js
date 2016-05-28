/**
 * Webuser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
	}
};

