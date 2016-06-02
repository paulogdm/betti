//LEVEL 2;


var GLOBAL_URL_GET_PROFILE = '/profile/getfullprofile/';
var GLOBAL_URL_GET_FOLLOW = '/profile/getfollowlist/';
var GLOBAL_URL_GET_POSTS = '';
var GLOBAL_URL_GET_FAV = '';
var GLOBAL_URL_GET_GROUPS = '';

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

angular.module("betti-app").controller('ProfileController', ['$scope', 'GetService', 
	function($scope, GetService) { 
	
	var login = window.location.pathname.split('/')[3];

	var data = {login: login};
	
	GetService.get_profile(data).then(
		function(response){
			if(response.status == 200){
				console.info(response);
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

angular.module("betti-app").controller('PostsController', ['$scope', 'GetService', function($scope){ 

	$scope.allPosts = [ 
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


angular.module("betti-app").controller('PostActionController', ['$scope', function($scope){ 


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
	$scope.addFriend = {
		profile_photo:

	}

	var login = window.location.pathname.split('/')[3];

	var data = {login: login};
	
	GetService.get_follow(data).then(
		function(response){
			if(response.status == 200){
				console.info(response);
				$scope.all_friends = response.data;
			}
		},function(response) {
			console.info("[Profile][get_follow] Error received!");
		}
	);

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
/