var usermodel = require('../models/User.js');

module.exports = {
	
	insertempty: function(requester, id, cb){


		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb({success: false});
			} else {

				requester = data.user.login.trim();

				var pgquery = "INSERT INTO post_reaction VALUES "+
				"('"+id+"', '"+requester+"', 0, FALSE, FALSE) ON CONFLICT DO NOTHING;"

				Post.query(pgquery, function(err, result){
					if (err){
						sails.log.debug(err);
						return cb({success: false});
					} else {
						return cb({success: true});
					}
				});
			}
		});
	},

	share: function(requester, id, cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {

				requester = data.user.login.trim();

				if(usermodel.isReserved(requester))
					return cb(null, false, {message: 'admin, you can\'t'});

				
				var pgquery = "SELECT * FROM POST WHERE post.post_id = "+id+";";
				
				Post.query(pgquery, function(err, result){
					if (err){
						sails.log.debug("[PostService.js][share] Query error:\t" + requester);
						sails.log.debug(err);
						return cb({success: false});
					} else {
						result = result.rows[0];

						result.text = result.text.replace(/^Shared from @(.{0,20}) :/, "");
						result.text = "Shared from @"+result.powner+": "+result.text;

						pgquery = "INSERT INTO post (powner, title, text) "+
						"VALUES ('"+requester+"', '"+result.title+"', '"+result.text+"') "+
						"returning post_id, powner;";
						//UPDATE REACTION
						
						Post.query(pgquery, function(err, result){
							if (err){
								sails.log.debug("[PostService.js][share] Query2 error:\t" + requester);
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
			}
		});
	},

	like: function(requester, id, cb){
		AuthService.tokendecode(requester, function(data){
			if(!data.success){
				return cb({success: false});
			} else {
				requester = data.user.login.trim();

				var pgquery = "SELECT * FROM post_reaction WHERE "+
				"post_id = "+id+" and preader = '"+requester+"';"

				Post.query(pgquery, function(err, result){
					if (err){
						return cb({success: false});
					} else {
						result = result.rows[0];

						pgquery = "UPDATE post_reaction SET "+
						"like_dislike = 0 WHERE "+
						"post_id = "+id+" AND preader = '"+requester+"'; "

						var response = {success: true, status: true};

						if(result.like_dislike == -1){

							pgquery += "UPDATE post_reaction SET "+
							"like_dislike = 1 WHERE "+
							"post_id = "+id+" AND preader = '"+requester+"';"

						} else if(result.like_dislike == 0) {
							
							pgquery =  "UPDATE post_reaction SET "+
							"like_dislike = 1 WHERE "+
							"post_id = "+id+" AND preader = '"+requester+"';"

						} else {
							response.status = false;
						}

						Post.query(pgquery, function(err, result){
							if (err){
								return cb(response);
							} else {
								return cb(response);
							}
						});

					}
				});
			}
		});
	},

	dislike: function(requester, id, cb){
		AuthService.tokendecode(requester, function(data){
			if(!data.success){
				return cb({success: false});
			} else {
				requester = data.user.login.trim();

				var pgquery = "SELECT * FROM post_reaction WHERE "+
				"post_id = "+id+" and preader = '"+requester+"';"

				Post.query(pgquery, function(err, result){
					if (err){
						return cb({success: false});
					} else {
						result = result.rows[0];

						pgquery = "UPDATE post_reaction SET "+
						"like_dislike = 0 WHERE "+
						"post_id = "+id+" AND preader = '"+requester+"'; "

						var response = {success: true, status: true};

						if(result.like_dislike == 1){

							pgquery += "UPDATE post_reaction SET "+
							"like_dislike = -1 WHERE "+
							"post_id = "+id+" AND preader = '"+requester+"';"

						} else if(result.like_dislike == 0) {
							
							pgquery =  "UPDATE post_reaction SET "+
							"like_dislike = -1 WHERE "+
							"post_id = "+id+" AND preader = '"+requester+"';"

						} else {

							response.status = false;
						}

						Post.query(pgquery, function(err, result){
							if (err){
								return cb(response);
							} else {
								return cb(response);
							}
						});

					}
				});
			}
		});
	},

	delete: function(requester, id,  cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb({success: false});
			} else {

				requester = data.user.login.trim();

				if(usermodel.isAdmin(requester))
					var pgquery = "DELETE FROM post WHERE post_id = "+id+";";
				else
					var pgquery = "DELETE FROM post WHERE post_id = "+id+
				" and powner = '"+requester+"';";
				
				Post.query(pgquery, function(err, result){
					if (err){
						sails.log.debug("[PostService.js][delete] Query error:\t" + requester);
						sails.log.debug(err);
						return cb({success: false});
					} else {
						return cb({success: true});
					}
				});
			}
		});
	},
	
	favorite: function(requester, id,  cb){

		AuthService.tokendecode(requester, function(data){
			if(!data.success){
				return cb({success: false});
			} else {
				requester = data.user.login.trim();

				var pgquery = "SELECT * FROM post_reaction WHERE "+
				"post_id = "+id+" and preader = '"+requester+"';"

				Post.query(pgquery, function(err, result){
					if (err){
						return cb({success: false});
					} else {
						result = result.rows[0];

						var response = {success: true};

						if(result.favorited){

							pgquery = "UPDATE post_reaction SET "+
							"favorited = false WHERE "+
							"post_id = "+id+" AND preader = '"+requester+"'; "+
							"DELETE FROM fav_post WHERE post_id = "+id+" and "+
							"webuser = '"+requester+"';";

							response.status = false;

						} else {

							pgquery = "UPDATE post_reaction SET "+
							"favorited = true WHERE "+
							"post_id = "+id+" AND preader = '"+requester+"'; "+
							"INSERT INTO fav_post(post_id, webuser) "+
							"VALUES ('"+id+"', '"+requester+"') "+
							"ON CONFLICT (post_id, webuser) "+
							"DO NOTHING;";

							response.status = true;
						}

						Post.query(pgquery, function(err, result){
							if (err){
								return cb(response);
							} else {
								return cb(response);
							}
						});
					}
				});
			}
		});
	}
}