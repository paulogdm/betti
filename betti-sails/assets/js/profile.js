//LEVEL 2;

var GLOBAL_URL_GET_PROFILE = '/profile/getfullprofile/';
var GLOBAL_URL_GET_FOLLOW = '/profile/getfollowlist/';
var GLOBAL_URL_GET_POSTS = '/profile/getposts/';
var GLOBAL_URL_GET_FAV = '/profile/getfavorites/';
var GLOBAL_URL_GET_GROUPS = '';

var GLOBAL_URL_ISMYPROFILE = '/profile/ismyprofile/';



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

	$scope.delete = function(index){
		PostService.delete($scope.allPosts[index]);
		$scope.allPosts.pop(index);
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

	$scope.delete = function(index){
		PostService.delete($scope.favPosts[index]);
		$scope.favPosts.pop(index)
	}

}]);


angular.module("betti-app").controller('AllFollowController', ['$scope', 'GetService', 'FollowCommService',
 function($scope, GetService, FollowCommService){
	
	var login = window.location.pathname.split('/')[3];
	var data = {login: login};

	GetService.get_follow(data).then(
		function(response){
			if(response.status == 200){
				$scope.allFollow = response.data;
			}

		},function(response) {
			console.info("[Profile][get_follow] Error received!");
		}
	);

	$scope.viewFollow = function(index){

		if($scope.allFollow[index].following){
			$scope.unfollow(index);
		} else {
			$scope.follow(index);
		}
	}

	$scope.follow = function(index){
		
		var data = {login: $scope.allFollow[index].login.trim()};
		$scope.allFollow[index].following = false;
		
		FollowCommService.unfollow(data).then(
			function(response){
			if(response.status == 200){
				showSnackbar("Following: "+data.login);
			}

		},function(response) {
			console.info("[Profile][follow] Error received!");
		});
	}

	$scope.unfollow = function(index){
		
		var data = {login: $scope.allFollow[index].login.trim()};
		$scope.allFollow[index].following = true;
		
		FollowCommService.follow(data).then(
			function(response){
				console.info(response);
			if(response.status == 200){
				showSnackbar("Unfollowing: "+data.login);
			}

		},function(response) {
			console.info("[Profile][unfollow] Error received!");
		});
	}

}]);


angular.module("betti-app").controller('AllGroupsController', ['$scope', function($scope){ 
	
}]);
