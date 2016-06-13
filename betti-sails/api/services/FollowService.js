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
				
				var pgquery = "SELECT webuser.uname as uname, webuser.login as login, "+
				"webuser.uphoto as uphoto, ME.ureceiver "+
				"FROM follow ORIGINAL inner join webuser on "+
				"ORIGINAL.usender = login and ORIGINAL.ureceiver = '"+login_to_show+"' "+
				"left outer join follow ME on ORIGINAL.usender = login and "+
				"ME.ureceiver = '"+requester+"' "+
				"ORDER BY uname;";


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

							if(result[i].ureceiver && result[i].ureceiver.trim() == requester){
								result[i].following = true;
							} else {
								result[i].following = false;
							}
						}
					}

					return cb(null, result);
				});
			}
		});	
	},



	follow: function(login, requester, cb){
				
		if(usermodel.isReserved(login))
			return cb({success: false, msg: "Can't do that"});

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb({success: false, message: 'invalid'});
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
					} else if(result.rowCount == 0){
						
						pgquery = "DELETE FROM follow "+
						"where usender = '"+login+"' and ureceiver = '"+requester+"';";

						Follow.query(pgquery, function(err, result){
							
							sails.log.debug(result);

							if(err){
								sails.log.debug("[FollowService.js][follow] Query2 error:\t" + login);
								sails.log.debug(err);
								return cb({success: false});
							} else {
								return cb({success: true, status: false});
							}
						});
					} else {
						return cb({success: true, status: true});
					}
				});
			}
		});
	}
}
