
angular.module("betti-app").controller('SettingsController', 
	['$scope', 'GetLayoutService', 'LayoutStyleService',
	function($scope, GetLayoutService, LayoutStyleService) { 
	
	GetLayoutService.get_profile().then(
		function(response){
			if(response.status == 200){
				$scope.profile_photo = response.data.uphoto; //substituir por uma funcao get
				$scope.cover_photo = response.data.ucover;  
				$scope.birthday = response.data.birthday;
				
				$scope.color_profile = response.data.style_profile; 
				slider1.MaterialSlider.change($scope.color_profile);
				
				
				$scope.color_search = response.data.style_bar;
				slider2.MaterialSlider.change($scope.color_search);

				$scope.color_mdl_class_profile = styleSwitch($scope.color_profile); //STYLE.JS
				$scope.color_mdl_class_profile_contrast = styleSwitchBar($scope.color_profile); //STYLE.JS
			}
		},function(response) {
			console.info("[Settings][get_profile] Error received!");
		}
	);

	$scope.changeColorProfile = function(){
		var value = $scope.color_profile;
		LayoutStyleService.setColorProfile(value);
		$scope.color_mdl_class_profile = styleSwitch(value); //STYLE.JS
		$scope.color_mdl_class_profile_contrast = styleSwitchBar(value); //STYLE.JS
	}

	$scope.changeColorSearch = function(){
		var value = $scope.color_search;
		LayoutStyleService.setColorSearch(value);
	}

	$scope.save = function(){

	}



}]);
