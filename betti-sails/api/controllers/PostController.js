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
	}
};
