//LEVEL 2;


var GLOBAL_URL_GET_PROFILE = '/profile/getfullprofile/';
var GLOBAL_URL_GET_FOLLOW = '/profile/getfollowlist/';
var GLOBAL_URL_GET_POSTS = '/profile/getposts/';
var GLOBAL_URL_GET_FAV = '/profile/getfavorites/';
var GLOBAL_URL_GET_GROUPS = '';

var GLOBAL_URL_NEWPOST = '/post/newpost/';
var GLOBAL_URL_ADDFAV = '/post/addfavorite/';
var GLOBAL_URL_RMVFAV = '/post/rmvfavorite/';


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

					post.liked = false;
					post.disliked = false;
					post.favorited = false;
					post.shared = false;


					posts.push(post);
				}
					console.info(posts);

				return posts;
			};

			PostService.like = function(post){
				if(post.disliked){
					post.disliked = false;
					post.dislikes --;
				}
				if(!post.liked){
					post.liked = true;
					post.likes ++;
				}
			}

			PostService.dislike = function(post){
				if(post.liked){
					post.liked = false;
					post.likes --;
				}
				if(!post.disliked){
					post.disliked = true;
					post.dislikes ++;
				}
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
				if(post.shared){
					post.shared = false;
					post.shares --;
				} else {
					post.shared = true;
					post.shares ++;
				}
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

	}

	AllPosts.get = function(){
		return this.all;
	}

	return AllPosts;
});


angular.module("betti-app").controller('ProfileController', ['$scope', 'GetService', 
	function($scope, GetService) { 
	
	var login = window.location.pathname.split('/')[3];

	var data = {login: login};
	
	GetService.get_profile(data).then(
		function(response){
			if(response.status == 200){
				$scope.profile_photo = response.data.uphoto; //substituir por uma funcao get
				$scope.cover_photo = response.data.ucover;  
				$scope.birthday = response.data.birthday;

				var num = response.data.style_profile; // GET
				$scope.color_mdl_class_profile = styleSwitch(num); //STYLE.JS
				$scope.color_mdl_class_profile_contrast = styleSwitchBar(num); //STYLE.JS
			}
		},function(response) {
			console.info("[Profile][get_profile] Error received!");
		}
	);
}]);

angular.module("betti-app").
	controller('NewPostController', ['$scope', 'PostCommService', 'AllPosts',
	function($scope, PostCommService, AllPosts){ 
		
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
								owner: user,
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
	var post = {};
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

angular.module("betti-app").controller('AllFavoritesController', ['$scope', function($scope){ 
		$scope.allFavorites = [ 
	{ 
		title: 'Titulo1',
		text: 'Lorem ipsum senectus habitant quisque litora scelerisque mollis massa primis himenaeos, hac id metus leo justo nam condimentum ullamcorper class aenean urna, morbi ligula ullamcorper fermentum duis tempus enim praesent quisque.',
		date: new Date('2016', '05', '04', '3', '21'),
		favorites: 99,
		likes: 01,
		dislikes: 02,
		forward: 03,
		liked: false,
		disliked: false,
		favorited: false,
		shared: false
	}, 
	{ 
		title: 'Titulo2',
		text: 'Text2',
		date: new Date('2016', '03', '08', '3', '55'),
		favorites: 99,
		likes: 01,
		dislikes: 02,
		forward: 02,
		liked: true,
		disliked: true,
		favorited: true,
		shared: true
	}
	]
}]);

angular.module("betti-app").controller('AllFriendsController', ['$scope', function($scope){ 
	
}]);

angular.module("betti-app").controller('AllGroupsController', ['$scope', function($scope){ 
	$scope.allGroups = [
	{
		profile_photo: '/images/views/cover_default.png', //substituir por uma funcao get
		name: 'Group1',
		following: true
	}
	]
}]);
