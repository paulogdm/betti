//LEVEL 2;


var GLOBAL_URL_NEWPOST = '/post/newpost/';
var GLOBAL_URL_ADDFAV = '/post/addfavorite/';
var GLOBAL_URL_RMVFAV = '/post/rmvfavorite/';
var GLOBAL_URL_LIKE = '/post/like/';
var GLOBAL_URL_DISLIKE = '/post/dislike/';
var GLOBAL_URL_NOLIKENORDISLIKE = '/post/rmvlikedislike'
var GLOBAL_URL_SHARE = '/post/share/';
var GLOBAL_URL_DELETEPOST = '/post/delete/';

angular.isUndefinedOrNull = function(val) {
	return angular.isUndefined(val) || val === null 
}

angular.module("betti-app").factory('PostCommService', function($http) {
	return {
		'new_post': function(data){
			return $http.post(GLOBAL_URL_NEWPOST, data);
		},
		'toggle_favorite': function(data){
			return $http.post(GLOBAL_URL_TOGFAV, data);
		},
		'like_post': function(data){
			return $http.post(GLOBAL_URL_LIKE, data);
		},
		'dislike_post': function(data){
			return $http.post(GLOBAL_URL_DISLIKE, data);
		},
		'share_post': function(data){
			return $http.post(GLOBAL_URL_SHARE, data);
		},
		'favorite_post': function(data){
			return $http.post(GLOBAL_URL_ADDFAV, data);
		},
		'unfavorite_post': function(data){
			return $http.post(GLOBAL_URL_RMVFAV, data);
		},
		'delete_post': function(data){
			return $http.post(GLOBAL_URL_DELETEPOST, data);
		},
		'is_my_profile': function(data) {
			return $http.post(GLOBAL_URL_ISMYPROFILE, data);
		},
	}
});

angular.module("betti-app")
	.factory('PostService', ['PostCommService',
		function(PostCommService) {
			
			var PostService = {};

			PostService.processPosts = function(json){

				var post;
				var posts = [];

				if(json)
					for (var i = json.data.length - 1; i >= 0; i--){

						post = {id: json.data[i].post_id};
						post.owner = json.data[i].powner;
						post.title = json.data[i].title;
						post.text = json.data[i].text;
						post.date = json.data[i].pdate;
						post.favorites = json.data[i].n_fav;
						post.likes = json.data[i].n_likes;
						post.dislikes = json.data[i].n_dislikes;
						post.shares = json.data[i].n_shares;

						post.editable = json.data[i].editable;

						post.liked = json.data[i].like_dislike == 1 ? true : false;
						post.disliked = json.data[i].like_dislike == -1 ? true : false;
						post.favorited = json.data[i].favorited ? true : false;
						post.shared = json.data[i].shared ? true : false;

						post.avatar = json.data[i].uphoto;

						posts.push(post);
					}

				return posts;
			};

			
			PostService.processUniquePost = function(post){

				return post;
			};

			PostService.like = function(post){
				
				PostCommService.like_post({post_id: post.id}).then(
				function(response){
					if(response.data.success){
						console.info("[Post][PostService.dislike] Sucess!");
						
						if(post.disliked){
							post.disliked = false;
							post.dislikes --;
						}
						if(!post.liked){
							post.liked = true;
							post.likes ++;
						}

					} else {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Post][PostService.dislike] Fail!");
					}
				},function(response) {
					console.info("[Post][PostService.dislike] Error received!");
				});
			}

			PostService.dislike = function(post){

				PostCommService.dislike_post({post_id: post.id}).then(
				function(response){
					if(response.data.success){
						console.info("[Post][PostService.dislike] Sucess!");
						
						if(post.liked){
							post.liked = false;
							post.likes --;
						}

						if(!post.disliked){
							post.disliked = true;
							post.dislikes ++;
						}

					} else {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Post][PostService.dislike] Fail!");
					}
				},function(response) {
					console.info("[Post][PostService.dislike] Error received!");
				});
			}

			PostService.favorite = function(post){

				if(post.favorited){
					PostCommService.unfavorite_post({post_id: post.id}).then(
					function(response){

						if(response.data.success){
							console.info("[Post][PostService.favorite] Sucess!");
							post.favorited = false;
							post.favorites --;
						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Post][PostService.favorite] Fail!");
						}
					},function(response) {
						console.info("[Post][PostService.favorite] Error received!");
					});
				} else {
					PostCommService.favorite_post({post_id: post.id}).then(
					function(response){

						if(response.data.success){
							console.info("[Post][PostService.favorite] Sucess!");
							post.favorited = true;
							post.favorites ++;
							
							showSnackbar("Post favorited!");

						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Post][PostService.favorite] Fail!");
						}
					},function(response) {
						console.info("[Post][PostService.favorite] Error received!");
					});
				}
			}

			PostService.share = function(post){

				PostCommService.share_post({post_id: post.id}).then(
				function(response){
					if(response.data.success){
						console.info("[Post][PostService.share] Sucess!");
						
						post.shared = true;
						post.shares ++;

						showSnackbar("Post shared!");

					} else {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Post][PostService.share] Fail!");
					}
				},function(response) {
					console.info("[Post][PostService.share] Error received!");
				});
			}

			PostService.delete = function(post){

				PostCommService.delete_post({post_id: post.id}).then(
				function(response){
					if(response.data.success){
						console.info("[Post][PostService.delete] Sucess!");
						showSnackbar("Post deleted!");
						return true;
					} else {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Post][PostService.delete] Fail!");
						return false;
					}
				},function(response) {
					console.info("[Post][PostService.delete] Error received!");
				});
			}

			return PostService;
		}
	]
);

angular.module("betti-app").factory('PostHolder', function() {

	var PostHolder = {};
	var all = [];

	PostHolder.set = function(array){
		this.all = array;
	}

	PostHolder.push = function(post){
		this.all.unshift(post);
	}

	PostHolder.pop = function(index){
		this.all.splice(index, 1);
	}

	PostHolder.get = function(){
		return this.all;
	}

	return PostHolder;
});
