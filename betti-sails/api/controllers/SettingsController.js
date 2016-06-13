/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	
 	//ALPHA FEATURE
 	uploadAvatar: function (req, res){

		var requester = req.cookies.token;
		
		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return res.json({success: false});
			} else {
				requester = data.user.login.trim();

				req.file('avatar').upload({
						maxBytes: 2000000, //2MB
						dirname: require('path').resolve(sails.config.appPath, '/assets/images/users'),
						saveAs: 'avatar_'+requester+'.jpg'
					},function whenDone(err, file){
			
					if (err){
						return res.json({success: false, err: err});
					}

					// If no files were uploaded, respond with an error.
					if (file.length === 0){
						return res.json({success: false});
					}

					return res.json({success: true, url: '/images/users/avatar_'+requester+'.jpg'});
				});
			}
		});
 	},

 	save: function (req, res){

 		var requester = req.cookies.token;
 		var data = req.param('settings');

		SettingsService.save(requester, data, function(msg){
			res.json(msg);
		});
	},

	delete: function (req, res){

 		var requester = req.cookies.token;

		SettingsService.deleteprofile(requester, function(msg){
			res.json(msg);
		});
	}
};

