var angApp = angular.module("betti-app", []);

angApp.factory('GetLayoutService', function($http) {
	return {
		'get_profile': function(data){
			return $http.post('/profile/getprofile/', data);
		}
	}
});


angApp.factory('LogoutService', function($http) {
	return {
		'logout': function(data){
			return $http.delete('/auth/logout', data);
		}
	}
});

angApp.factory('LayoutStyleService',['GetLayoutService',
 function(GetLayoutService) {
	
	var color_search = 0;
	var color_mdl_search = styleSwitch(0);
	var color_profile = 0;
	var color_mdl_profile = styleSwitch(0);

	var avatar = '';
	var birthday = '';
	var name = '';
	var cover = '';
	var login = '';

	var LayoutStyleService = {};

	LayoutStyleService.request = function(value){
		GetLayoutService.get_profile().then(
			function(response){
				if(response.status == 200){
					
					LayoutStyleService.setAvatar(response.data.uphoto);
					LayoutStyleService.setCover(response.data.cover);
					LayoutStyleService.setBirthday(response.data.birthday);
					LayoutStyleService.setName(response.data.uname.trim());
					LayoutStyleService.setLogin(response.data.login.trim());

					LayoutStyleService.setColorSearch(response.data.style_bar);
					LayoutStyleService.setColorProfile(response.data.style_profile);
				}
			},function(response) {
				console.info("[Layout][get_profile] Error received!");
			}
		);
	}

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
	
	LayoutStyleService.setBirthday = function(value){
		this.birthday = value;
	}

	LayoutStyleService.getBirthday = function(){
		return this.birthday;
	}

	LayoutStyleService.setAvatar = function(value){
		this.avatar = value;
	}

	LayoutStyleService.getAvatar = function(){
		return this.avatar;
	}

	LayoutStyleService.setCover = function(value){
		this.cover = value;
	}

	LayoutStyleService.getCover = function(){
		return this.cover;
	}

	return LayoutStyleService;
}]);


angApp.controller('SideBarController', ['$scope', '$location', 'LayoutStyleService', 'GetLayoutService',
	'LogoutService',
	function($scope, $location, LayoutStyleService, GetLayoutService, LogoutService){ 

	LayoutStyleService.request();

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

	$scope.search = function(){
		console.info($scope.search_input);
		if($scope.search_input != null){
			window.location.href = "/userspace/search/"+$scope.search_input; 
		} else {
			showSnackbar("Sorry! Failed: "+$scope.search_input);
		}
	}

	$scope.logout = function(){
		LogoutService.logout().then(
		function(response){
			if(response.status == 200){
				var now = new Date();

				var now = new Date();

				document.cookie = 'token=; expires=Thu, 01 Jan 1993 00:00:01 GMT; Path=/;';
				window.location.href = '/';
			}
		},function(response) {
			console.info("[Layout][get_profile] Error received!");
		}
	);
	}

}]);

function showSnackbar(msg){ 
	var notification = document.querySelector('#snackbar-show'); 
	var data = {
		message: msg,
	};
	notification.MaterialSnackbar.showSnackbar(data); 
}
