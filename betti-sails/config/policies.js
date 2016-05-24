

module.exports.policies = {
	
	UserSpaceController: {
		"*" : "hasToken"
	},

	UserController: {
	    "create": true
	},
	AuthController: {
	    '*': true
	}
};
