/**
 * PostReaction.js
 *
 */

module.exports = {

	tableName: 'post_reaction',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	
	attributes: {
		post_id : {
			type: 'string',
			primaryKey: true
		},

		preader : {
			type: 'string',
			primaryKey: true
		},

		like_dislike : {
			type: 'boolean'
		},

		shared : {
			type: 'boolean'
		},

		favorited : {
			type: 'boolean'
		}
	}
};


