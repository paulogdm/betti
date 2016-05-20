/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	/////////////
	//CRITICAL //
	/////////////

	//original poster
	//Foreign Key
	//internal control. Don't know if it's gonna be useful;
	
  	id: {
  		type: 'integer',
  		unique: true,
  		required: true,
  		primaryKey: true
  	},

  	owner:{
  		model: 'user',
  		unique: true,
  		required: true
  	},

	//title of the msg
  	title: {
  		type: 'string',
  		required: true
  	},

  	//content of the msg
  	text: {
  		type: 'string',
  		required: true
  	},

  	//generated date
	date: {
  		type: 'string',
  		required: true
  	},

	//////////////
  	//RELATIONS //
	//////////////
	// 
	// everything here is Foreign Keys
	// 


  	//people that likes the msg
  	who_liked: {
  		collection: 'user'
  	},
  	
  	//people that !likes the msg
  	who_disliked: {
  		collection: 'user'
  	},

  	//people that favorited the msg
  	who_fav: {
  		collection: 'user'
  	},

  	//people that shared the msg
  	who_shared: {
  		collection: 'user'
  	},

	//////////////
	// COSMETIC //
	//////////////

	//everything here is the number of ppl 
  	nLikes: {
  		type: 'integer',
  		defaultsTo: '0'
  	},

  	nDislikes: {
  		type: 'integer',
  		defaultsTo: '0'
  	},

  	nShares: {
  		type: 'integer',
  		defaultsTo: '0'
  	},

  	nFavs: {
  		type: 'integer',
  		defaultsTo: '0'
  	}
  }
};

