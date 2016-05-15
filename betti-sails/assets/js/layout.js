
var angApp = angular.module("betti-template-app", []);


angApp.controller('SideBarController', ['$scope', function($scope) { 

	$scope.user_name = 'Rich Jones'; //substituir por uma funcao get
	$scope.user_avatar = './img/profile.jpg'; //substituir por uma funcao get
}]);

angApp.controller('StyleController', ['$scope', function($scope) { 

	var num = 0; // GET
	$scope.color_mdl_class_page = styleSwitch(num); //STYLE.JS

}]);

