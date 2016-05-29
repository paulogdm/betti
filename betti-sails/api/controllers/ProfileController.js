var user = require('../models/User.js');

module.exports = {
	getProfile: function(req, res){
		var login = req.param('login')
		sails.log.debug(login);
		
		if(login){
			user.getProfile(login, function (err, result){
				if (err)
					return res.negotiate(err);
				else return res.json(result);
			})
		} else res.notfound();
	}
};
