//LEVEL 2;


var GLOBAL_URL_GET_PROFILE = '/profile/getfullprofile/';
var GLOBAL_URL_GET_FOLLOW = '/profile/getfollowlist/';
var GLOBAL_URL_GET_POSTS = '/profile/getposts/';
var GLOBAL_URL_GET_FAV = '/profile/getfavorites/';
var GLOBAL_URL_ISMYPROFILE = '/profile/ismyprofile/';
var GLOBAL_URL_GET_GROUPS = '';

var GLOBAL_URL_NEWPOST = '/post/newpost/';
var GLOBAL_URL_ADDFAV = '/post/addfavorite/';
var GLOBAL_URL_RMVFAV = '/post/rmvfavorite/';
var GLOBAL_URL_LIKE = '/post/like/';
var GLOBAL_URL_DISLIKE = '/post/dislike/';
var GLOBAL_URL_NOLIKENORDISLIKE = '/post/rmvlikedislike'
var GLOBAL_URL_SHARE = '/post/share/';
var GLOBAL_URL_DELETEPOST = '/post/delete/';

var GLOBAL_URL_FOLLOW = '/follow/unfollow'
var GLOBAL_URL_UNFOLLOW = '/follow/follow'


angular.isUndefinedOrNull = function(val) {
	return angular.isUndefined(val) || val === null 
}

angular.module("betti-app").factory('GetService', function($http) {
	return {
		'get_profile': function(data){
			return $http.post(GLOBAL_URL_GET_PROFILE, data);
		},
		'get_follow': function(data) {
			return $http.post(GLOBAL_URL_GET_FOLLOW, data);
		},
		'get_groups': function(data) {
			return $http.post(GLOBAL_URL_GET_GROUPS, data);
		},
		'get_posts': function(data) {
			return $http.post(GLOBAL_URL_GET_POSTS, data);
		},
		'get_fav': function(data) {
			return $http.post(GLOBAL_URL_GET_FAV, data);
		}
	}
});

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
						console.info("[Profile][PostService.dislike] Sucess!");
						
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
						console.info("[Profile][PostService.dislike] Fail!");
					}
				},function(response) {
					console.info("[Profile][PostService.dislike] Error received!");
				});
			}

			PostService.dislike = function(post){

				PostCommService.dislike_post({post_id: post.id}).then(
				function(response){
					if(response.data.success){
						console.info("[Profile][PostService.dislike] Sucess!");
						
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
						console.info("[Profile][PostService.dislike] Fail!");
					}
				},function(response) {
					console.info("[Profile][PostService.dislike] Error received!");
				});
			}

			PostService.favorite = function(post){

				if(post.favorited){
					PostCommService.unfavorite_post({post_id: post.id}).then(
					function(response){

						if(response.data.success){
							console.info("[Profile][PostService.favorite] Sucess!");
							post.favorited = false;
							post.favorites --;
						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Profile][PostService.favorite] Fail!");
						}
					},function(response) {
						console.info("[Profile][PostService.favorite] Error received!");
					});
				} else {
					PostCommService.favorite_post({post_id: post.id}).then(
					function(response){

						if(response.data.success){
							console.info("[Profile][PostService.favorite] Sucess!");
							post.favorited = true;
							post.favorites ++;
						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Profile][PostService.favorite] Fail!");
						}
					},function(response) {
						console.info("[Profile][PostService.favorite] Error received!");
					});
				}
			}

			PostService.share = function(post){

				PostCommService.share_post({post_id: post.id}).then(
				function(response){
					if(response.data.success){
						console.info("[Profile][PostService.share] Sucess!");
						
						if(post.shared){
							post.shared = false;
							post.shares --;
						} else {
							post.shared = true;
							post.shares ++;
						}

					} else {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Profile][PostService.share] Fail!");
					}
				},function(response) {
					console.info("[Profile][PostService.share] Error received!");
				});
			}

			return PostService;
		}
	]
);

angular.module("betti-app").factory('AllPosts', function() {

	var AllPosts = {};
	var all = [];

	AllPosts.set = function(array){
		this.all = array;
	}

	AllPosts.push = function(post){
		this.all.unshift(post);
	}

	AllPosts.pop = function(index){
		this.all.splice(index, 1);
	}

	AllPosts.get = function(){
		return this.all;
	}

	return AllPosts;
});

angular.module("betti-app").factory('FavPosts', function() {

	var FavPosts = {};
	var fav = [];

	FavPosts.set = function(array){
		this.fav = array;
	}

	FavPosts.push = function(post){
		this.fav.unshift(post);
	}

	FavPosts.pop = function(index){
		this.fav.splice(index, 1);
	}

	FavPosts.get = function(){
		return this.fav;
	}

	return FavPosts;
});


angular.module("betti-app").
	controller('NewPostController', ['$scope', 'PostCommService', 'AllPosts',
	function($scope, PostCommService, AllPosts){ 
		
		$scope.is_my_profile = false;
		
		var data = {};
		data.login = window.location.pathname.split('/')[3];

		PostCommService.is_my_profile(data).then(
			function(response){
				if(response.status == 200){
					$scope.is_my_profile = response.data.is;
				} else {
					showSnackbar("Sorry... Something is wrong");
				}
			},
			function(response) {
				console.info("[Profile][ismyprofile] Error received!");
			}
		);

		$scope.new_post = function(){

			if (angular.isUndefinedOrNull($scope.new_text.trim())){
				showSnackbar("Write something on the field text...");
			} else {
				var user = window.location.pathname.split('/')[3];

				if($scope.new_title) $scope.new_title = $scope.new_title.trim();
				else $scope.new_title = "untitled";

				$scope.new_text = $scope.new_text.trim();

				var data = {
					login: user,
					title: $scope.new_title,
					text: $scope.new_text
				};

				PostCommService.new_post(data).then(
					function(response){
						if(response.data.success){
							console.info("[Profile][NewPost] Success received");

							var new_post = {
								id: response.data.id,
								owner: response.data.powner,
								title: $scope.new_title,
								text: $scope.new_text,
								date: new Date(),
								favorites: 0,
								likes: 0,
								dislikes: 0,
								shares: 0,
								editable: true,
								liked: false,
								disliked: false,
								favorited: false,
								shared: false
							}

							AllPosts.push(new_post);
							
							$scope.new_title = '';
							$scope.new_text = '';

						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Profile][NewPost] Fail");
						}
					},
					function(response) {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Profile][NewPost] Error received!");
					}
				);
			}
		}
}]);

angular.module("betti-app").
	controller('PostsController', ['$scope', 'GetService', 'PostService', 'AllPosts', 
	function($scope, GetService, PostService, AllPosts){ 

	var login = window.location.pathname.split('/')[3];

	var data = {login: login};
	$scope.allPosts = {};

	GetService.get_posts(data).then(
		function(response){
			if(response.status == 200){
				AllPosts.set( PostService.processPosts(response) );
				$scope.allPosts = AllPosts.get();
			}
		},function(response) {
			console.info("[Profile][get_posts] Error received!");
		}
	);

	$scope.like = function(index){
		PostService.like($scope.allPosts[index]);
	}
	

	$scope.dislike = function(index){
		PostService.dislike($scope.allPosts[index]);
	}
	
	$scope.favorite = function(index){
		PostService.favorite($scope.allPosts[index]);
	}

	$scope.share = function(index){
		PostService.share($scope.allPosts[index]);
	}

}]);

angular.module("betti-app").
	controller('AllFavoritesController', ['$scope', 'GetService', 'PostService', 'FavPosts', 
	function($scope, GetService, PostService, FavPosts){ 

	var login = window.location.pathname.split('/')[3];

	var data = {login: login};
	$scope.favPosts = {};

	GetService.get_fav(data).then(
		function(response){
			if(response.status == 200){
				FavPosts.set( PostService.processPosts(response) );
				$scope.favPosts = FavPosts.get();
			}
		},function(response) {
			console.info("[Profile][get_fav] Error received!");
		}
	);

	$scope.like = function(index){
		PostService.like($scope.favPosts[index]);
	}
	

	$scope.dislike = function(index){
		PostService.dislike($scope.favPosts[index]);
	}
	
	$scope.favorite = function(index){
		PostService.favorite($scope.favPosts[index]);
	}

	$scope.share = function(index){
		PostService.share($scope.favPosts[index]);
	}

}]);


angular.module("betti-app").factory('FollowCommService', function($http) {
	return {
		'follow': function(data){
			return $http.post(GLOBAL_URL_FOLLOW, data);
		},
		'unfollow': function(data){
			return $http.post(GLOBAL_URL_UNFOLLOW, data);
		}
	}
});

angular.module("betti-app").controller('AllFollowController', ['$scope', 'GetService', 'FollowCommService',
 function($scope, GetService, FollowCommService){
	
	var login = window.location.pathname.split('/')[3];
	var data = {login: login};

	GetService.get_follow(data).then(
		function(response){

			if(response.status == 200){
				$scope.allFollow = response.data
			}

		},function(response) {
			console.info("[Profile][get_follow] Error received!");
		}
	);

	$scope.follow = function(index){

	}

}]);


angular.module("betti-app").controller('AllGroupsController', ['$scope', function($scope){ 
	
}]);
