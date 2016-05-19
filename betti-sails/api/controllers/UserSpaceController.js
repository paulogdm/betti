/**
 * UserSpaceController
 *
 * @description :: Server-side logic for managing Userspaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	profile: function (req, res) {
		res.view('users/profile', {layout: 'users/layout'})
	},
	
	search: function (req, res) {
		res.view('users/search', {layout: 'users/layout'})
	},

	404: function (req, res) {
		res.view('users/404', {layout: 'users/layout'})
	}
};

