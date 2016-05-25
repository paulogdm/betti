

module.exports.policies = {
	'*' : "hasToken",

	UserController: {
	    "create": true
	},
	AuthController: {
	    '*': true
	}
};
