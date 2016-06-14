var usermodel = require('../models/User.js');

module.exports = {
	newPost: function(requester, post,  cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {

				if(usermodel.isReserved(requester))
					return cb(null, false, {message: 'admin, you can\'t'});

				requester = data.user.login.trim();
				post.title = post.title.replace(/'/g, "\\'");
				post.text = post.text.replace(/'/g, "\\'");

				var pgquery = 'INSERT INTO post (powner, title, text) '+
				'VALUES (\''+requester+'\', \''+post.title+'\', \''+post.text+'\') '+
				'returning post_id, powner;';
				
				Post.query(pgquery, function(err, result){
					if (err){
						sails.log.debug("[PostService.js][NewPost] Query error:\t" + requester);
						sails.log.debug(err);
						return cb({success: false});
					} else {
						return cb({success: true, 
							id: result.rows[0].post_id, 
							powner: result.rows[0].powner
						});
					}
				});
			}
		});
	},

	getOnePost: function(id, requester, cb){
		
		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
					
				var pgquery = 'select * from post where ' +
				'post.post_id = \''+id+'\'';

				Post.query(pgquery, function(err, result){
					if (err) {
						sails.log.debug("[PostService.js][getOnePost] Query error:\t" + login);
						sails.log.debug(JSON.stringify(result));

						return cb(null, err);
					}
					
					if(result) result = result.rows[0];

					if(requester == result.powner)
						result.editable = true;
					else result.editable = false;

					return cb(null, result);
				});
			}
		});
	},

	getAllPosts: function(login_to_show, requester, cb){

		if(usermodel.isReserved(login_to_show))
			return cb(null, false, {message: 'invalid'});

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
				
				if(!login_to_show)
					login_to_show = requester;

				var pgquery = "select *, post.post_id as post_id from post "+
				"left outer join post_reaction on "+
				"post.post_id = post_reaction.post_id and "+
				"preader = '"+ requester +"' where "+
				"powner = '"+login_to_show+"' "+
				"order by pdate asc"

				Post.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[PostService.js][getAllPosts] Query error:" + login_to_show);
						sails.log.debug(JSON.stringify(result));

						return cb(null, err);
					}

					if(result) {
						result = result.rows;
						var isAdmin = usermodel.isAdmin(requester);

						for(var i = result.length - 1; i >= 0; i--){
							if(isAdmin || requester == result[i].powner.trim())
								result[i].editable = true;
							else result[i].editable = false;
						}
					}
					return cb(null, result);
				});
			}
		});
	},

	getAllFavorites: function(login_to_show, requester, cb){

		if(usermodel.isReserved(login_to_show))
			return cb(null, false, {message: 'invalid'});

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
				
				if(!login_to_show)
					login_to_show = requester;
				
				var pgquery = "select post.*, post_reaction.*, post.post_id as post_id "+
				"from fav_post "+
				"inner join post on "+
				"fav_post.post_id = post.post_id and "+
				"webuser = '"+ login_to_show+"' "+
				"left outer join post_reaction on "+
				"fav_post.post_id = post_reaction.post_id "+
				"and preader = '"+ requester+"';";


				Post.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[PostService.js][getAllPosts] Query error:\t" + login_to_show);
						sails.log.debug(err);

						return cb(null, err);
					}

					if(result) {
						result = result.rows;
						var isAdmin = usermodel.isAdmin(requester);

						for(var i = result.length - 1; i >= 0; i--){
							if(isAdmin || requester == result[i].powner.trim())
								result[i].editable = true;
							else result[i].editable = false;
						}
					}
					return cb(null, result);
				});
			}
		});
	}
}
