/**
 * AdminSpaceController
 *
 * @description :: Server-side logic for managing Adminspaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	profile: function (req, res) {
		res.view('users/profile', {layout: 'admin/layout'})
	},
	
	search: function (req, res) {
		res.view('users/search', {layout: 'admin/layout'})
	},

	404: function (req, res) {
		res.view('users/404', {layout: 'admin/layout'})
	}
};
