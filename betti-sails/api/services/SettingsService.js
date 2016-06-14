module.exports = {
	save: function(requester, data, cb){

		AuthService.tokendecode(requester, function(decoded){
			
			if(!decoded.success){
				return cb({sucess: false});
			} else {
				
				var pgquery = 'UPDATE webuser SET';
				var values = '';
				var flag = false;

				requester = decoded.user.login.trim();

				if(data.style_profile){
					values +=' style_profile = \''
					+data.style_profile+'\',';
					flag = true;
				}

				if(data.style_bar){

					values +=' style_bar = \''
					+data.style_bar+'\',';
					flag = true;
				}

				if(data.password){

					values +=' password = \''
					+data.password+'\',';
					flag = true;
				}

				if(data.name){
					data.name = data.name.replace(/'/g, "\\'");
					values +=' name = \''
					+data.name+'\',';
					flag = true;
				}

				if(data.birthday){

					values +=' birthday = \''
					+data.birthday+'\',';
					flag = true;
				}

				if(data.description){
					data.description = data.description.replace(/'/g, "\\'");

					var query = "INSERT INTO webuserDescription(login, description) "+
					"VALUES ('"+requester+"', '"+data.description+ "')"+ 
					"ON CONFLICT (login) DO UPDATE SET description = '"+data.description+"';";

					UserDescription.query(query, function(err, result){
						if(err) {
							sails.log.debug("[SettingsService.js][save][descr] Query error:\t");
							sails.log.debug(JSON.stringify(result));
							sails.log.debug(JSON.stringify(data));

							return cb({success: false});
						}

						if(result.rowCount != 1)
							return cb({success: false});
					});
				}

				if(!flag)
					return cb({success: false});

				values = values.slice(0, -1);
				pgquery += values;
				pgquery += ' WHERE login = \'' + requester + '\';';

				User.query(pgquery, function(err, result){
					if (err) {
						sails.log.debug("[SettingsService.js][save] Query error:\t");
						sails.log.debug(JSON.stringify(result));
						sails.log.debug(JSON.stringify(data));

						return cb({success: false});
					}

					if(result.rowCount == 1)
						return cb({success: true});
					else
						return cb({success: false});
				});
			}
		});
	},

	deleteprofile: function(requester, cb){
		AuthService.tokendecode(requester, function(decoded){
			
			if(!decoded.success){
				return cb({sucess: false});
			} else {
				requester = decoded.user.login.trim();

				var pgquery = "DELETE FROM WEBUSER WHERE "+
				" login = '"+requester+"';";

				User.query(pgquery, function(err, result){
					if (err) {
						sails.log.debug("[SettingsService.js][delete] Query error:\t");
						sails.log.debug(err);
						return cb({success: false});
					}

					if(result.rowCount == 1)
						return cb({success: true});
					else
						return cb({success: false});
				});
			}
		});		
	}
}
