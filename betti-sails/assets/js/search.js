var GLOBAL_URL_SEARCH = '/search/';

angular.isUndefinedOrNull = function(val) {
	return angular.isUndefined(val) || val === null 
}

angular.module("betti-app").factory('SearchService', function($http) {
	return {
		'search': function(data) {
			return $http.post(GLOBAL_URL_SEARCH, data);
		}
	}
});


angular.module("betti-app").controller('SearchController', ['$scope', 'SearchService', 
	'FollowCommService',
 function($scope, SearchService, FollowCommService){
	
	var login = window.location.pathname.split('/')[3];
	var data = {search: login};

	SearchService.search(data).then(
		function(response){
			if(response.status == 200){
				$scope.userResult = response.data;
			}

		},function(response) {
			console.info("[Search][search] Error received!");
		}
	);

	$scope.viewFollow = function(index){
			$scope.follow(index);
	}

	$scope.follow = function(index){
		
		var data = {login: $scope.userResult[index].login.trim()};

		FollowCommService.follow(data).then(
			function(response){
			if(response.data.success){
				if(response.data.status){
					$scope.userResult[index].following = true;
					showSnackbar("Following: "+data.login);
				} else {
					$scope.userResult[index].following = false;
					showSnackbar("Unfollowing: "+data.login);
				}
			}

		},function(response) {
			console.info("[Profile][follow] Error received!");
		});
	}

}]);
