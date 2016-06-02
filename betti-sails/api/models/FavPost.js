/**
 * FavPost.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'fav_post',
	autoCreatedAt: false,
	autoUpdatedAt: false,

	attributes: {
		post_id : {
			type: 'string',
			primaryKey: true
		},

		webuser : {
			type: 'string',
			primaryKey: true
		}
	}
};

