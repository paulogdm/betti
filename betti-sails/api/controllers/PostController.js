/**
 * PostController
 */

module.exports = {
	newpost: function(req, res){
		
		var requester = req.cookies.token;
		var login = req.param('login');

		var data = {};
		data.title = req.param('title');
		data.text = req.param('text');

		PostService.newPost(login, requester, data, function(result){
			res.json(result);
		});
	},

	addfavorite: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostService.addFavorite(requester, id, function(result){
			res.json(result);
		});
	},
	rmvfavorite: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostService.rmvFavorite(requester, id, function(result){
			res.json(result);
		});
	},

	like: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostService.like(requester, id, function(result){
			res.json(result);
		});	
	},

	dislike: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostService.dislike(requester, id, function(result){
			res.json(result);
		});
	},

	share: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostService.share(requester, id, function(result){
			res.json(result);
		});
	}
};
