
var angApp = angular.module("betti-app", []);


angApp.controller('SideBarController', ['$scope', function($scope) { 

	$scope.user_name = 'Rich Jones'; //substituir por uma funcao get
	$scope.user_avatar = '/images/views/profile_default.png'; //substituir por uma funcao get
}]);

angApp.controller('StyleController', ['$scope', function($scope) { 

	var num = 0; // GET
	$scope.color_mdl_class_page = styleSwitch(num); //STYLE.JS

}]);

