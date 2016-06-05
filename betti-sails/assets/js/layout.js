var angApp = angular.module("betti-app", []);

angApp.factory('GetLayoutService', function($http) {
	return {
		'get_profile': function(data){
			return $http.post('/profile/getmyprofile/', data);
		}
	}
});

angApp.factory('LayoutStyleService', function() {
	
	var color_search = 0;
	var color_mdl_search = styleSwitch(0);
	var color_profile = 0;
	var color_mdl_profile = styleSwitch(0);


	var LayoutStyleService = {};

	LayoutStyleService.setColorSearch = function(value){
		this.color_search = value; //STYLE.JS
		this.color_mdl_search = styleSwitch(value);
	}

	LayoutStyleService.getColorSearch = function(){
		return color_search;
	}

	LayoutStyleService.getColorMdlSearch = function(){
		return this.color_mdl_search;
	}
	
	LayoutStyleService.setColorProfile = function(value){
		this.color_profile = value; //STYLE.JS
		this.color_mdl_profile = styleSwitch(value);
	}

	LayoutStyleService.getColorProfile = function(){
		return color_profile;
	}

	LayoutStyleService.getColorMdlProfile = function(){
		return this.color_mdl_profile;
	}

	LayoutStyleService.setName = function(value){
		this.name = value;
	}

	LayoutStyleService.getName = function(){
		return this.name;
	}

	LayoutStyleService.setLogin = function(value){
		this.login = value;
	}

	LayoutStyleService.getLogin = function(){
		return this.login;
	}

	return LayoutStyleService;
});


angApp.controller('SideBarController', ['$scope', 'LayoutStyleService', 'GetLayoutService',
	function($scope, LayoutStyleService, GetLayoutService){ 

	GetLayoutService.get_profile().then(
		function(response){
			if(response.status == 200){
				$scope.user_avatar = response.data.uphoto; //substituir por uma funcao get
				$scope.birthday = response.data.birthday;
				$scope.user_name = response.data.uname.trim();
				LayoutStyleService.setColorSearch(response.data.style_bar);
				LayoutStyleService.setColorProfile(response.data.style_profile);
			}
		},function(response) {
			console.info("[Layout][get_profile] Error received!");
		}
	);
}]);

angApp.controller('LayoutStyleController', ['$scope', 'LayoutStyleService', 
	function($scope, LayoutStyleService) { 

	$scope.color_mdl_search = LayoutStyleService.getColorMdlSearch();
	$scope.color_mdl_profile = LayoutStyleService.getColorMdlProfile();

	$scope.$watch(
		function(){
			$scope.color_mdl_profile = LayoutStyleService.getColorMdlProfile();
		}
	)

	$scope.$watch(
		function(){
			$scope.color_mdl_search = LayoutStyleService.getColorMdlSearch();
		}
	)

}]);

function showSnackbar(msg){ 
	var notification = document.querySelector('#snackbar-show'); 
	var data = {
		message: msg,
	};
	notification.MaterialSnackbar.showSnackbar(data); 
}
