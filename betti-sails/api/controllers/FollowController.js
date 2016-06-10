module.exports = {
	follow: function(req, res){
		
		var requester = req.cookies.token;
		var to_follow = req.param('login');

		FollowService.follow(to_follow, requester, function(result){
			res.json(result);
		});
	},

	unfollow: function(req, res){
		
		var requester = req.cookies.token;
		var to_unfollow = req.param('login');

		FollowService.follow(to_unfollow, requester, function(result){
			res.json(result);
		});
	}
};
