//LEVEL 2;

var GLOBAL_URL_GET_FRESH = '/feed/fresh/';
var GLOBAL_URL_GET_HOT = '/feed/hot/';


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
	controller('NewPostController', 
		['$scope', 'PostCommService', 'FreshPosts', 'LayoutStyleService', 'PostService',
	function($scope, PostCommService, FreshPosts, LayoutStyleService, PostService){ 

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
							console.info("[Timeline][NewPost] Success received");

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
								shared: false,
								avatar: LayoutStyleService.getAvatar()

							}

							FreshPosts.push(PostService.processUniquePost(new_post));
							
							$scope.new_title = '';
							$scope.new_text = '';

						} else {
							showSnackbar("Sorry... Something is wrong");
							console.info("[Timeline][NewPost] Fail");
						}
					},
					function(response) {
						showSnackbar("Sorry... Something is wrong");
						console.info("[Timeline][NewPost] Error received!");
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
			console.info("[Timeline][get_fresh] Error received!");
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
	