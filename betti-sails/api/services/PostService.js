var user = require('../models/User.js');

module.exports = {
	newPost: function(login, cb){

	},

	getOnePost: function(id, cb){
		
		var pgquery = 'select * from post where ' +
		'post.id = \''+id+'\'';

		User.query(pgquery, function(err, result){
			if (err) {
				sails.log.debug("[PostService.js][getOnePost] Query error:\t" + login);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}
			
			if(result) result = result.rows[0];

			return cb(null, result);
		});
	},

	getAllPosts: function(login_to_show, /*login_requester,*/ cb){
		
		if(user.isReserved(login_to_show)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = 'select * from post where ' +
		'post.powner = \''+login_to_show+'\'';

		User.query(pgquery, function(err, result){
			if(err){
				sails.log.debug("[PostService.js][getAllPosts] Query error:\t" + login_to_show);
				sails.log.debug(JSON.stringify(result));

				return cb(null, err);
			}

			if(result) result = result.rows;
			
			return cb(null, result);
		});
	}
}