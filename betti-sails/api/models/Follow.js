/**
 * Follow.js
 *
 */

module.exports = {

	tableName: 'follow',
	autoCreatedAt: false,
	autoUpdatedAt: false,

	attributes: {
		usender : {
			type: 'string',
			primaryKey: true
		},

		ureceiver : {
			type: 'string',
			primaryKey: true
		}
	}
};
