var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOneById(id).done(function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    passReqToCallback : true
  },
  function(req, login, password, done) {
    // verifica no mongo se o nome de usuário existe ou não
    User.findOne({ 'login' :  login },
      function(err, user) {
        // Em caso de erro, retorne usando o método done
        if (err)
          return done(err);
        // Nome de usuário não existe, logar o erro & redirecione de volta
        if (!user){
          console.log('Unknown user ' + login);
          return done(null, false,
                req.flash('message', 'Unknown user ' + login));
        }
        // Usuário existe mas a senha está errada, logar o erro
        if (!isValidPassword(user, password)){
          console.log('Wrong pass');
          return done(null, false,
              req.flash('message', 'Wrong pass'));
        }
        // Tanto usuário e senha estão corretos, retorna usuário através 
        // do método done, e, agora, será considerado um sucesso
        return done(null, user);
      }
    );
}));