var usermodel = require('../models/User.js');

module.exports = {

	import: function(requester, data, cb){
		AuthService.tokendecode(requester, function(auth){
			if(!auth.success){
				return cb({success: false});
			} else {

				requester = auth.user.login.trim();

				if(!usermodel.isAdmin(requester))
					return cb({success: false, msg: "Not admin"});

				var pgquery = "BEGIN;\n";
				var user_map = {};

				if(data.users){
					pgquery = pgquery + "insert into webuser "+
					"(login, uname, password, birthday) "+
					"VALUES ";

					for (var i = data.users.length - 1; i >= 0; i--) {

						user_map[data.users[i].id] = data.users[i].login;

						pgquery = pgquery + "('"+
						data.users[i].login+"','"+
						data.users[i].nome+"','"+
						data.users[i].password+"','"+
						data.users[i].birthday+"'), ";
					}

					pgquery = pgquery.slice(0, -2);
					pgquery += " ON CONFLICT (login) DO NOTHING;\n";
				} else {
					return cb({success: false, msg: "Bad format."});
				}

				if(data.follow){
					pgquery = pgquery + "insert into follow "+
					"(usender, ureceiver) "+
					"VALUES ";

					for (var i = data.follow.length - 1; i >= 0; i--) {

						var usender = user_map[data.follow[i].follows];
						var ureceiver = user_map[data.follow[i].follower];

						pgquery = pgquery + "('"+
						usender+"','"+
						ureceiver+"'), ";
					}

					pgquery = pgquery.slice(0, -2);
					pgquery += " ON CONFLICT (usender, ureceiver) DO NOTHING;\n";
				} else {
					return cb({success: false, msg: "Bad format."});
				}

				if(data.tweets){
					pgquery = pgquery + "insert into post "+
					"(post_id, powner, title, text, pdate) "+
					"VALUES ";

					for (var i = data.tweets.length - 1; i >= 0; i--) {

						var powner = user_map[data.tweets[i].user];

						pgquery = pgquery + "('"+
						data.tweets[i].id+"','"+
						powner+"','"+
						data.tweets[i].title+"','"+
						data.tweets[i].text+"','"+
						data.tweets[i].timestamp+"'), ";
					}

					pgquery = pgquery.slice(0, -2);
					pgquery += " ON CONFLICT (post_id, powner) DO NOTHING;\n";
				} else {
					return cb({success: false, msg: "Bad format."});
				}

				if(data.share){
					pgquery = pgquery + "insert into fav_post "+
					"(post_id, webuser) "+
					"VALUES ";

					for (var i = data.share.length - 1; i >= 0; i--){

						var webuser = user_map[data.share[i].user];

						pgquery = pgquery + "('"+
						data.share[i].id+"','"+
						webuser+"'), ";
					}

					pgquery = pgquery.slice(0, -2);
					pgquery += " ON CONFLICT (post_id, webuser) DO NOTHING;\n";
				} else {
					return cb({success: false, msg: "Bad format."});
				}


				sails.log.debug(pgquery);
				
				User.query(pgquery, function(err, result){
					if (err){

						sails.log.debug(err);
						
						User.query("ROLLBACK; ", function(err, result){
							if (err){
								sails.log.debug("[ImportService] Query error:\t" + requester);
								sails.log.debug(err);
								return cb({success: false, msg: "Bad format caused query error."});
							} else {
								sails.log.debug("[ImportService] ROLLBACK SUCCESS");
								sails.log.debug("[ImportService] Query error:\t" + requester);
								sails.log.debug(err);
								return cb({success: false, msg: "Bad format caused query error."});
							}
						});
					} else {
						User.query("COMMIT; ", function(err, result){
							if (err){
								sails.log.debug("[ImportService] Query error:\t" + requester);
								sails.log.debug(err);
								return cb({success: false, msg: "Bad format caused query error."});
							} else {
								sails.log.debug("IMPORT DATA OK -- START");
								sails.log.debug(data);
								sails.log.debug("IMPORT DATA OK -- END");
								return cb({success: true});
							}
						});
					}
				});
			}
		});
	},

	export: function(requester, cb){
		AuthService.tokendecode(requester, function(auth){
			if(!auth.success){
				return cb({success: false});
			} else {

				requester = auth.user.login.trim();

				if(!usermodel.isAdmin(requester))
					return cb({success: false, msg: "Not admin"});

				var pgquery = "";
				var response = {};

				/////////////////////////
				//ASSYNC WAIT FUNCTION //
				/////////////////////////
				var finished = _.after(6, call_the_cb);

				///////////////////
				//ASSYNC TRIGGER //
				///////////////////	
				function call_the_cb(){
				  return cb({success: true, result: response});
				}


				User.query("select * from webuser", function(err, result1){
					if (err){
						sails.log.debug("[ExportService] Q1 ERROR\t");
					}
					response.users = result1.rows;
					finished();
				});

				User.query("select * from post", function(err, result2){
					if (err){
						sails.log.debug("[ExportService] Q2 ERROR");
					}
					response.tweets = result2.rows;
					finished();
				});

				User.query("select * from follow", function(err, result3){
					if (err){
						sails.log.debug("[ExportService] Q3 ERROR");
					}
					response.follow = result3.rows;
					finished();
				});

				User.query("select * from fav_post", function(err, result4){
					if (err){
						sails.log.debug("[ExportService] Q4 ERROR");
					}
					response.fav_post = result4.rows;
					finished();
				});

				User.query("select * from post_reaction", function(err, result5){
					if (err){
						sails.log.debug("[ExportService] Q5 ERROR");
					}
					response.post_reaction = result5.rows;
					finished();
				});

				User.query("select * from webuserDescription", function(err, result6){
					if (err){
						sails.log.debug("[ExportService] Q6 ERROR");
					}
					response.bios = result6.rows;
					finished();
				});
			}
		});
	}
}
