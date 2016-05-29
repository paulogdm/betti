

module.exports.policies = {
	'*' : true,
	// '*' : "hasToken",

	UserController: {
	    "create": true
	},
	AuthController: {
	    '*': true
	}
};
