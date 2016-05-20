/**
 * Follow.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	
  	//this is a POSTER = the guy that send the msg
  	sender: {
  		model: 'user',
  		required: true,
  		primaryKey: true
  	},

  	//this is a FOLLOWER = the guy that receive the msg
  	receiver: { 
  		model: 'user',
  		required: true,
  		primaryKey: true
  	}
  }
};

