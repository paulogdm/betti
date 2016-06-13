var DEF_USER_PHOTO = '/images/views/profile_default.png';

module.exports = {
	
	search: function(content, requester, cb){

		if(!content){
			return cb({success: false});
		}

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, false, {message: 'invalid'});
			} else {
				requester = data.user.login.trim();
				
				var pgquery = "SELECT webuser.uname as uname, webuser.login as login, "+
				"webuser.uphoto as uphoto, ureceiver "+
				"FROM webuser "+
				"left outer join follow on usender = login and "+
				"ureceiver = '"+requester+"' "+
				"where login % '"+content+"' ;";

				Follow.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[SearchService.js][search] Query error:\t" + content);
						sails.log.debug(err);

						return cb(err);
					}

					if(result){
						result = result.rows;

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

					return cb(result);
				});
			}
		});	
	}
}