

module.exports.connections = {

 
  // localDiskDb: {
    // adapter: 'sails-disk'
  // },

  
  postgreserver: {
    adapter: 'sails-postgresql',
    host: '198.199.79.4',
    port: '5432',
    user: 'pguser', // optional
    password: 'rudineiweb', // optional
    database: 'webdb' //optional
  }

};
