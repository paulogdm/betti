
angular.module("betti-app").factory('PanelComm', function($http){
	return {
		'upload': function(data) {
			return $http.post('/settings/up', data);
		},

		'download': function(data) {
			return $http.post('/panel/down', data);
		}
	}
});

angular.module("betti-app").controller('PanelController',
	['$scope', 'PanelComm',
	function($scope, PanelComm){ 
	
}]);
