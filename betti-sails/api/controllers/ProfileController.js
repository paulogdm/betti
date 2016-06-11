/**
 * ProfileController
 */

module.exports = {
	getprofile: function(req, res){
		
		var data = {};
		data.login = req.param('login');
		data.requester = req.cookies.token;

		ProfileService.getProfile(data, function(err, user){
			if(err || !user){
				res.json({sucess: false});
			} else {
				user.uname.trim();
				res.json(user);
			}
		});
	},
	
	ismyprofile: function(req, res){
		
		var login = req.param('login');
		var requester = req.cookies.token;

		if(!login){
			res.json({is: true});
		} else {
			AuthService.tokendecode(requester, function(data){
				if(!data.success){
					return res.json({is: false});
				} else {
					if(login == data.user.login.trim()){
						return res.json({is: true});
					} else {
						return res.json({is: false});
					}
				}
			});
		}
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
	},

	getfollowlist: function (req, res) {
		
		var login = req.param('login');
		var requester = req.cookies.token;

		FollowService.getFollowList(login, requester, function(err, list){
			if(err || !list){
				res.json({sucess: false});
			} else {
				res.json(list);
			}
		});
	},

	getposts: function(req, res){

		var login = req.param('login');
		var requester = req.cookies.token;

		PostService.getAllPosts(login, requester, function(err, list){
			if(err || !list){
				res.json({sucess: false});
			} else {
				res.json(list);
			}
		});
	},

	getfavorites: function(req, res){

		var login = req.param('login');
		var requester = req.cookies.token;

		PostService.getAllFavorites(login, requester, function(err, list){
			if(err || !list){
				res.json({sucess: false});
			} else {
				res.json(list);
			}
		});
	}
};
