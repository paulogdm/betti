/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  login: function (req, res) {
    AuthService.login(req, res);
  },
  validate_token: function (req, res) {
    AuthService.tokendecode(req, res);
  },
  logout: function(req, res){
    req.logout();
    res.send(200);
  }
};

