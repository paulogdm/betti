/**
 * AdminSpaceController
 *
 */

module.exports = {
	profile: function (req, res) {
			
		var data = {};
		data.login = req.param('login');
		data.requester = req.cookies.token;
		
		if(!data.login)
			return res.view('404', {layout: 'admin/layout'});

		ProfileService.getProfile(data, function(err, result){
			if(err){
				res.serverError();
			}
			else if(!result || err){
				res.view('404', {layout: 'admin/layout'});
			} else {
				var locals = result;
				locals.layout = 'admin/layout';
				
				res.view('users/profile', locals);
			}
		});
	},
		
	settings: function (req, res) {

		var locals = {};
		locals.layout = 'admin/layout';
		res.view('users/settings', locals);
	},

	panel: function (req, res) {
		
		var locals = {};
		locals.layout = 'admin/layout';
		res.view('admin/panel', locals);
	},

	search: function (req, res) {
		res.view('users/search', {layout: 'admin/layout'})
	},

	404: function (req, res) {
		res.view('404', {layout: 'admin/layout'})
	}
};
