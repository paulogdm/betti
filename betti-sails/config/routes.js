
module.exports.routes = {

	'/': {
		view: 'login'
	},

	'get /userspace/profile/:login': {
		controller: 'UserSpaceController',
		action: 'profile',
		skipAssets: true
	},

	'get /adminspace/profile/:login': {
		controller: 'AdminSpaceController',
		action: 'profile',
		skipAssets: true
	}
};
