var angApp = angular.module("betti-app", []);

angApp.controller('SideBarController', ['$scope', function($scope) { 

	$scope.user_name = 'Badmin'; //substituir por uma funcao get
	$scope.user_avatar = '/images/views/admin_default.png'; //substituir por uma funcao get

}]);

angApp.controller('LayoutStyleController', ['$scope', function($scope) { 
	var num = 6; // GET
	$scope.color_mdl_class_page = styleSwitch(num); //STYLE.JS
}]);
