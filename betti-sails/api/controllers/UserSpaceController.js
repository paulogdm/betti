/**
 * UserSpaceController
 */

module.exports = {
	profile: function (req, res) {
		
		var login = req.param('login');
		var requester = req.cookies.token;

		ProfileService.getProfile(login, requester, function(err, user){
			if(err){
				res.serverError();
			}
			else if(!user || err){
				res.view('404', {layout: 'users/layout'});
			} else {
				user.uname.trim();
				var locals = user;
				locals.layout = 'users/layout';
				res.view('users/profile', locals);
			}
		});
	},
	
	settings: function (req, res) {

		var requester = req.cookies.token;

		ProfileService.getProfile(null, requester, function(err, user){
			if(err){
				res.serverError();
			}
			else if(!user || err){
				res.view('404', {layout: 'users/layout'});
			} else {
				user.uname.trim();
				var locals = user;
				locals.layout = 'users/layout';
				res.view('users/settings', locals);
			}
		});

	},

	search: function (req, res) {
		res.view('users/search', {layout: 'users/layout'})
	},

	404: function (req, res) {
		res.view('404', {layout: 'users/layout'})
	}
};
