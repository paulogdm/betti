module.exports = {
	search: function(req, res){

		var content = req.param('search');
		var requester = req.cookies.token;

		SearchService.search(content, requester, function(result){
			res.json(result);
		});
	}

}