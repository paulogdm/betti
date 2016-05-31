/**
 * ProfileController
 */

module.exports = {
	getfullprofile: function (req, res) {
		var login = req.param('login');

		ProfileService.getProfile(login, function(err, user){
			if(err || !user){
				res.json({sucess: false});
			} else {
				user.uname.trim();
				res.json(user);
			}
		});
	},

	getnameandphoto: function (req, res) {
		var login = req.param('login');

		ProfileService.getNameAndPhoto(login, function(err, user){
			if(err || !user){
				res.json({sucess: false});
			} else {
				user.uname.trim();
				res.json(user);
			}
		});
	}
};