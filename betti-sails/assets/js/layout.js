var angApp = angular.module("betti-app", []);

var GLOBAL_URL_GET_PROFILE = '';
var GLOBAL_URL_GET_FRIENDS = '';
var GLOBAL_URL_GET_POSTS = '';
var GLOBAL_URL_GET_FAV = '';
var GLOBAL_URL_GET_GROUPS = '';

angApp.factory('GetService', function($http) {
	return {
		'get_profile': function(data) {
			return $http.get(GLOBAL_URL_GET_PROFILE, data);
		},
		'get_friends': function(data) {
			return $http.get(GLOBAL_URL_GET_FRIENDS, data);
		},
		'get_groups': function(data) {
			return $http.get(GLOBAL_URL_GET_GROUPS, data);
		},
		'get_posts': function(data) {
			return $http.get(GLOBAL_URL_GET_POSTS, data);
		},
		'get_fav': function(data) {
			return $http.get(GLOBAL_URL_GET_FAV, data);
		}
	}
});

angApp.controller('SideBarController', ['$scope', function($scope) { 

	$scope.user_name = 'Steve Woggi'; //substituir por uma funcao get
	$scope.user_avatar = '/images/views/profile_default.png'; //substituir por uma funcao get

}]);

angApp.controller('LayoutStyleController', ['$scope', function($scope) { 
	var num = 0; // GET
	$scope.color_mdl_class_page = styleSwitch(num); //STYLE.JS
}]);
