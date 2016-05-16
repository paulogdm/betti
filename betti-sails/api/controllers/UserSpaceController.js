/**
 * UserSpaceController
 *
 * @description :: Server-side logic for managing Userspaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	profile: function (req, res) {
		res.view('users/profile', {layout: 'users/layout'})
	}
};

