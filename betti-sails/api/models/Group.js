/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	//name
  	group_name: {
  		type: 'string',
  		required: true,
  		unique: true,
  		primaryKey: true
  	},
  	
  	//url to pic
  	cover_photo:{
  		type: 'string',
  	},

  	total_members:{
  		type: 'integer',
  		defaultsTo: '1'
  	},

  	//set of users
  	admins: {
  		collection: 'user'
  	},

  	//set of users
  	members: {
  		collection: 'user'
  	}
  }
};

