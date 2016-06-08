var usermodel = require('../models/User.js');

module.exports = {
	newPost: function(login, requester, post,  cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
				
				if(requester == login){
					
					var pgquery = 'INSERT INTO post (powner, title, text) '+
					'VALUES (\''+login+'\', \''+post.title+'\', \''+post.text+'\') '+
					'returning post_id;';
					
					Post.query(pgquery, function(err, result){
						if (err){
							sails.log.debug("[PostService.js][NewPost] Query error:\t" + login);
							sails.log.debug(JSON.stringify(result));
							return cb({success: false});
						} else {
							return cb({success: true, id: result.rows[0].post_id});
						}
					});

				} else {
					return cb({success: false});
				}
			}
		});
	},

	addFavorite: function(requester, id,  cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
	
				var pgquery ='INSERT INTO fav_post(post_id, webuser) '+
				'VALUES (\''+id+'\', \''+requester+'\') '+
				'ON CONFLICT (post_id, webuser) '+
				'DO NOTHING;'

				//reactions

				FavPost.query(pgquery, function(err, result){
					if (err){
						sails.log.debug("[PostService.js][addFavorite] Query error:\t" + id + requester);
						sails.log.debug(JSON.stringify(result));
						return cb({success: false});
					} else {
						return cb({success: true});
					}
				});
			}
		});
	},

	rmvFavorite: function(requester, id,  cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
	
				var pgquery ='DELETE FROM fav_post WHERE post_id = \''+id+'\''+
				' AND webuser = \''+requester+'\'';
				
				//reactions

				FavPost.query(pgquery, function(err, result){
					if (err){
						sails.log.debug("[PostService.js][addFavorite] Query error:\t" + id + requester);
						sails.log.debug(JSON.stringify(result));
						return cb({success: false});
					} else {
						return cb({success: true});
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
				'post.id = \''+id+'\'';

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
				
				var pgquery = "select * from post left outer join post_reaction on "+
				"post.post_id = post_reaction.post_id and "
				"preader = '"+ requester +"' and "
				"powner = '"+login_to_show+"';";


				Post.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[PostService.js][getAllPosts] Query error:\t" + login_to_show);
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
	}
}
