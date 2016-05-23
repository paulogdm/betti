
module.exports.routes = {

  '/': {
    view: 'login'

  },
  'get /user/login':{
    controller: 'user',
    action: 'login'
  },
  'post /user/login':{
    controller: 'user',
    action: 'passport_local'
  }
};
