/**
 * PostController
 */

module.exports = {
	newpost: function(req, res){
		
		var requester = req.cookies.token;

		var data = {};
		data.title = req.param('title');
		data.text = req.param('text');

		PostService.newPost(requester, data, function(result){
			res.json(result);
		});
	},

	favorite: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');
		
		PostActionService.insertempty(requester, id, function(status){
			if(status.success){
				PostActionService.favorite(requester, id, function(result){
					res.json(result);
				});
			} else {
				res.json({success: false});
			}
		});
	},

	like: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostActionService.insertempty(requester, id, function(status){
			if(status.success){
				PostActionService.like(requester, id, function(result){
					res.json(result);
				});
			} else {
				res.json({success: false});
			}
		});	
	},

	dislike: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostActionService.insertempty(requester, id, function(status){
			if(status.success){
				PostActionService.dislike(requester, id, function(result){
					res.json(result);
				});
			} else {
				res.json({success: false});
			}
		});
	},

	share: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostActionService.insertempty(requester, id, function(status){
			if(status.success){
				PostActionService.share(requester, id, function(result){
					res.json(result);
				});
			} else {
				res.json({success: false});
			}
		});
	},

	delete: function(req, res){
		var requester = req.cookies.token;
		var id = req.param('post_id');

		PostActionService.insertempty(requester, id, function(status){
			if(status.success){
				PostActionService.delete(requester, id, function(result){
					res.json(result);
				});
			} else {
				res.json({success: false});
			}
		});
	}
};
