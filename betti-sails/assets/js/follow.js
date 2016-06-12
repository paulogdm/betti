//LEVEL 2;


var GLOBAL_URL_IM_FOLLOWING = '/profile/imfollowing/';
var GLOBAL_URL_FOLLOW = '/follow/unfollow'
var GLOBAL_URL_UNFOLLOW = '/follow/follow'


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
