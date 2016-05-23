var auth = require('../services/auth');

module.exports = {

  attributes: {
	//////////////////////
	//CRITICAL SECTION //
	//////////////////////
	//PK, accepts numbers and letters
  	login: {
  		type: 'string',
  		unique: true,
  		required: true,
  		primaryKey: true
  	},

  	//Only letters
  	name: {
  		type: 'string',
  		required: true
  	},

  	password: {
  		type: 'string',
      required: true
    },

    birthday: {
      type: 'string',
  		required: true
  	},

	//////////////////////
	//RELATIONS SECTION //
	//////////////////////
	//my posts
  	user_posts: {
  		collection: 'post' //'owner' of post
  	},

  	//who i am following?
  	user_following: {
  		// collection: 'user'
  		collection: 'user' , via: 'receiver', through: 'follow',// 'receiver' of someone
  	},

	//who is following me?
  	user_followers: {
  		// collection: 'user'
  		collection: 'user' , via: 'receiver', through: 'follow'// 'receiver' of someone
  	},

	//////////////////////
  	// COSMETIC SECTION //
	//////////////////////
  	//url to my avatar
  	profile_photo:{
  		type: 'string',
  	},

  	//url to my cover pic
	cover_photo:{
		type: 'string',
	},

	//little text about the user
	description:{
		type: 'string',
	},

	//little text to display on homepage profile
	motto:{
		type: 'string',
	},

	//number from 0 to 10. Don't need to check it.
  	style_profile: {
  		type: 'integer',
  		defaultsTo: '0'
  	},

	//number from 0 to 10. Don't need to check it.
  	style_bar: {
  		type: 'integer',
  		defaultsTo: '0'
  	}
  }
};

