var passport = require('passport');
module.exports = {
    login: function (req,res){
        res.view();
    },

    passport_local: function(req, res)
    {
        passport.authenticate('local', function(err, user, info)
        {
            if ((err) || (!user))
            {
                res.redirect('/');
                return;
            }

            req.logIn(user, function(err){
                if (err){
                    res.redirect('/');
                    return;
                }

                //sucess
                res.redirect('/userspace/profile');
                return;
            });
        })(req, res);
    },

    logout: function (req,res)
    {
        req.logout();
        res.redirect('/');
    },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}


};