/**
 * UserSpaceController
 */

module.exports = {
	profile: function (req, res) {
		var login = req.param('login');

		ProfileService.getProfile(login, function(err, user){
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
	
	search: function (req, res) {
		res.view('users/search', {layout: 'users/layout'})
	},

	404: function (req, res) {
		res.view('404', {layout: 'users/layout'})
	}
};

