module.exports = {
	getFollowList: function(login_to_show, login_requester, cb){
		if(user.isReserved(login)){
			return cb(null, false, {
				message: 'invalid'
			});
		}

		var pgquery = '';

		
	}
}
