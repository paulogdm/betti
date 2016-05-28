/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'post',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	
	attributes: {
		post_id : {
			primaryKey: true,
			type: 'integer'
		},
		powner : {
			type: 'string'
		},
		title : {
			type: 'string'
		},
		text : {
			type: 'string'
		},
		pdate : {
			type: 'date'
		},
		n_likes : {
			type: 'integer'
		},
		n_dislikes : {
			type: 'integer'
		},
		n_shares : {
			type: 'integer'
		},
		n_favs : {
			type: 'integer'
		}
	}
};

