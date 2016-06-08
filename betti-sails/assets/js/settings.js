
angular.module("betti-app").factory('SettingsComm', function($http){
	return {
		'save': function(data) {
			return $http.post('/settings/save', data);
		},

		'delete_profile': function(data) {
			return $http.post('/settings/delete', data);
		}
	}
});


angular.module("betti-app").controller('SettingsController',
	['$scope', 'GetLayoutService', 'LayoutStyleService', 'SettingsComm',
	function($scope, GetLayoutService, LayoutStyleService, SettingsComm) { 
	
	var color_profileBKP;
	var color_searchBKP;

	GetLayoutService.get_profile().then(
		function(response){
			if(response.status == 200){
				
				$scope.color_profile = response.data.style_profile; 
				this.color_profileBKP = $scope.color_profile;
				slider1.MaterialSlider.change($scope.color_profile);
								
				$scope.color_search = response.data.style_bar;
				this.color_searchBKP = $scope.color_search;
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

	$scope.saveSettings = function(){

		var style_profile = ($scope.color_profile == this.color_profileBKP) ? undefined : $scope.color_profile;
		var style_bar = ($scope.color_search == this.color_searchBKP) ? undefined : $scope.color_search;

		var data = {
			settings: {
				style_profile: style_profile,
				style_bar: style_bar,
				password: $scope.new_password,
				name: $scope.new_name,
				birthday: $scope.new_date,
				description: $scope.description
			}
		};

		showSnackbar("Sending...");

		SettingsComm.save(data).then(
			function(response) {
				if(response.data.success){
					showSnackbar("Success! Please refresh this page.");
					$scope.new_password = undefined;
					$scope.new_name = undefined;
					$scope.new_date = undefined;
					$scope.description = undefined;
				} else {
					showSnackbar("Failed to save...");
				}
			},
			function(response) {
				showSnackbar("Error received from server. Invalid user?");
			}
		);
	
	}

}]);
