module.exports = {

	fresh: function(req, res){
		
		var requester = req.cookies.token;

		FeedService.fresh(requester, function(err, result){
			res.json(result);
		});		
	},

	hot: function(req, res){
		
		var requester = req.cookies.token;

		FeedService.hot(requester, function(err, result){
			res.json(result);
		});
	}
};
