var usermodel = require('../models/User.js');
var DEF_USER_PHOTO = '/images/views/profile_default.png';

module.exports = {
	getFollowList: function(login_to_show, requester, cb){

		if(usermodel.isReserved(login_to_show))
			return cb(null, false, {message: 'invalid'});

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
				
				if(!login_to_show)
					login_to_show = requester;
				
				var pgquery = "SELECT uname, login, uphoto "+
				"FROM follow inner join webuser on "+
				"usender = login and ureceiver = '"+login_to_show+"' "+
				"ORDER BY uname;";

				//FALTA DIZER SE ESTOU SEGUINDO O CARA OU NAO

				Follow.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[FollowService.js][getFollowList] Query error:\t" + login_to_show);
						sails.log.debug(err);

						return cb(null, err);
					}

					if(result){
						result = result.rows;

						//FALTA DIZER SE ESTOU SEGUINDO O CARA OU NAO
						for(var i = result.length - 1; i >= 0; i--){
							if(!result[i].uphoto)
								result[i].uphoto = DEF_USER_PHOTO;
						}
					}

					return cb(null, result);
				});
			}
		});	
	},

	follow: function(login, requester, cb){

		if(usermodel.isReserved(login))
			return cb({success: false, message: "admin can't"});

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb({message: 'invalid'});
			} else {

				requester = data.user.login.trim();

				if(login == requester)
					return cb({success: false, msg: "You can't follow yourself"});

				if(!login)
					login = requester;
				
				var pgquery = "INSERT INTO follow(usender, ureceiver) "+
				"VALUES ('"+login+"', '"+requester+"') "+
				"ON CONFLICT (usender, ureceiver) DO NOTHING;"

				Follow.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[FollowService.js][follow] Query error:\t" + login);
						sails.log.debug(err);

						return cb({success: false});
					}

					return cb({success: true});
				});
			}
		});	
	},

	unfollow: function(login, requester, cb){

		if(usermodel.isReserved(login))
			return cb({success: false, message: "admin can't"});

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb({message: 'invalid'});
			} else {

				requester = data.user.login.trim();

				if(login == requester)
					return cb({success: false});

				if(!login)
					login = requester;

				var pgquery = "DELETE FROM follow WHERE "+
				"usender = "+login+" AND ureceiver = '"+requester+"';"

				Follow.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[FollowService.js][unfollow] Query error:\t" + login);
						sails.log.debug(err);

						return cb({success: false});
					}

					return cb({success: true});
				});
			}
		});	
	}
}
