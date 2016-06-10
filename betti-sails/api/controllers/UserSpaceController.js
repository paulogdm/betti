/**
 * UserSpaceController
 */

module.exports = {
	profile: function (req, res) {
		
		var data = {};
		data.login = req.param('login');
		data.requester = req.cookies.token;
		
		ProfileService.getProfile(data, function(err, result){
			if(err){
				res.serverError();
			}
			else if(!result || err){
				res.view('404', {layout: 'users/layout'});
			} else {
				
				var locals = result;
				locals.layout = 'users/layout';
				
				res.view('users/profile', locals);
			}
		});
	},
	
	settings: function (req, res) {

		var locals = {};
		locals.layout = 'users/layout';
		res.view('users/settings', locals);
	},

	news: function (req, res) {
		
		var locals = {};
		locals.layout = 'users/layout';
		res.view('users/timeline', locals);
	},

	search: function (req, res) {
		res.view('users/search', {layout: 'users/layout'})
	},

	404: function (req, res) {
		res.view('404', {layout: 'users/layout'})
	}
};
