//LEVEL 2;

var GLOBAL_URL_GET_FRESH = '/feed/fresh/';
var GLOBAL_URL_GET_HOT = '/feed/hot/';

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
		'get_fresh': function(data){
			return $http.post(GLOBAL_URL_GET_FRESH, data);
		},
		'get_hot': function(data) {
			return $http.post(GLOBAL_URL_GET_HOT, data);
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
		}
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
						console.info("[Timeline][PostService.dislike] Fail!");
					}
				},function(response) {
					console.info("[Timeline][PostService.dislike] Error received!");
				});
			}

			PostService.favorite = function(post){

				if(post.favorited){
					PostCommService.unfavorite_post({post_id: post.id}).then(
					function(response){

						if(response.data.success){
							console.info("[Timeline][PostService.favorite] Sucess!");
							post.favorited = false;
							post.favorites --;
						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Timeline][PostService.favorite] Fail!");
						}
					},function(response) {
						console.info("[Timeline][PostService.favorite] Error received!");
					});
				} else {
					PostCommService.favorite_post({post_id: post.id}).then(
					function(response){

						if(response.data.success){
							console.info("[Timeline][PostService.favorite] Sucess!");
							post.favorited = true;
							post.favorites ++;
						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Timeline][PostService.favorite] Fail!");
						}
					},function(response) {
						console.info("[Timeline][PostService.favorite] Error received!");
					});
				}
			}

			PostService.share = function(post){

				PostCommService.share_post({post_id: post.id}).then(
				function(response){
					if(response.data.success){
						console.info("[Timeline][PostService.share] Sucess!");
						
						if(post.shared){
							post.shared = false;
							post.shares --;
						} else {
							post.shared = true;
							post.shares ++;
						}

					} else {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Timeline][PostService.share] Fail!");
					}
				},function(response) {
					console.info("[Timeline][PostService.share] Error received!");
				});
			}

			return PostService;
		}
	]
);


angular.module("betti-app").factory('FreshPosts', function() {

	var FreshPosts = {};
	var all = [];

	FreshPosts.set = function(array){
		this.all = array;
	}

	FreshPosts.push = function(post){
		this.all.unshift(post);
	}

	FreshPosts.pop = function(index){
		this.all.splice(index, 1);
	}

	FreshPosts.get = function(){
		return this.all;
	}

	return FreshPosts;
});

angular.module("betti-app").factory('HotPosts', function() {

	var HotPosts = {};
	var all = [];

	HotPosts.set = function(array){
		this.all = array;
	}

	HotPosts.push = function(post){
		this.all.unshift(post);
	}

	HotPosts.pop = function(index){
		this.all.splice(index, 1);
	}

	HotPosts.get = function(){
		return this.all;
	}

	return HotPosts;
});


angular.module("betti-app").
	controller('StyleController', ['$scope', 'LayoutStyleService', 
	function($scope, LayoutStyleService){ 

		$scope.avatar = LayoutStyleService.getAvatar();
		$scope.birthday = LayoutStyleService.getBirthday();
		$scope.name = LayoutStyleService.getName();
		$scope.login = LayoutStyleService.getLogin();

		$scope.color_mdl_search = LayoutStyleService.getColorMdlSearch();
		$scope.color_mdl_profile = LayoutStyleService.getColorMdlProfile();

		$scope.$watch(
			function(){
				$scope.color_mdl_profile = LayoutStyleService.getColorMdlProfile();
				$scope.color_mdl_search = LayoutStyleService.getColorMdlSearch();

				$scope.avatar = LayoutStyleService.getAvatar();
				$scope.birthday = LayoutStyleService.getBirthday();
				$scope.name = LayoutStyleService.getName();
				$scope.login = LayoutStyleService.getLogin();
			}
		)
}]);

angular.module("betti-app").
	controller('NewPostController', ['$scope', 'PostCommService', 'FreshPosts', 'LayoutStyleService',
	function($scope, PostCommService, FreshPosts, LayoutStyleService){ 
		
		$scope.avatar = LayoutStyleService.getAvatar();
		$scope.birthday = LayoutStyleService.getBirthday();
		$scope.name = LayoutStyleService.getName();
		$scope.login = LayoutStyleService.getLogin();

		$scope.$watch(
			function(){
				$scope.avatar = LayoutStyleService.getAvatar();
				$scope.birthday = LayoutStyleService.getBirthday();
				$scope.name = LayoutStyleService.getName();
				$scope.login = LayoutStyleService.getLogin();
			}
		)

		$scope.new_post = function(){

			if (angular.isUndefinedOrNull($scope.new_text.trim())){
				showSnackbar("Write something on the field text...");
			} else {

				if($scope.new_title) $scope.new_title = $scope.new_title.trim();
				else $scope.new_title = "untitled";

				$scope.new_text = $scope.new_text.trim();

				var data = {
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

							FreshPosts.push(PostService.processPosts(new_post));
							
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
	controller('FreshController', ['$scope', 'GetService', 'PostService', 'FreshPosts', 'LayoutStyleService',
	function($scope, GetService, PostService, FreshPosts, LayoutStyleService){ 

	$scope.freshPosts = {};

	$scope.color_mdl_search = LayoutStyleService.getColorMdlSearch();
	$scope.color_mdl_profile = LayoutStyleService.getColorMdlProfile();

	$scope.$watch(
		function(){
			$scope.color_mdl_profile = LayoutStyleService.getColorMdlProfile();
			$scope.color_mdl_search = LayoutStyleService.getColorMdlSearch();
		}
	)


	GetService.get_fresh(null).then(
		function(response){
			if(response.status == 200){
				FreshPosts.set( PostService.processPosts(response) );
				$scope.freshPosts = FreshPosts.get();
			}
		},function(response) {
			console.info("[Profile][get_fresh] Error received!");
		}
	);

	$scope.like = function(index){
		PostService.like($scope.freshPosts[index]);
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
	