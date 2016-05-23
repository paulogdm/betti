

module.exports.connections = {

 
  // localDiskDb: {
    // adapter: 'sails-disk'
  // },

  
  postgreserver: {
    adapter: 'sails-postgresql',
    host: '198.199.79.4',
    port: '5432',
    user: 'pguser', // optional
    password: 'EDIT HERE EDIT HERE', // optional
    database: 'db_betti_1' //optional
  }

};
