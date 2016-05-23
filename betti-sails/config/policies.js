

module.exports.policies = {
	'*': 'isAuth',
	'user': {
		'*': true
	},
	'auth': {
		'*': true
	}
};
