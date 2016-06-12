
angular.module("betti-app").factory('PanelComm', function($http){
	return {
		'upload': function(data) {
			return $http.post('/panel/up', data);
		},

		'download': function(data) {
			return $http.post('/panel/down', data);
		}
	}
});

angular.module("betti-app").directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});

angular.module("betti-app").controller('PanelController',
	['$scope', 'PanelComm',
	function($scope, PanelComm){

		$scope.getFile = function($fileContent){

			try {
				$scope.usersobj = JSON.parse($fileContent);
				showSnackbar("Upload complete. You can save now.");
			} catch(e) {
				showSnackbar("Not JSON format. Remove comments and upload it again.");
			}
		};

		$scope.uploadFile = function(){
			var data = {};
			data.data = $scope.usersobj;

			PanelComm.upload(data).then(
				function(response) {
					if(response.data.success){
						showSnackbar("Import successful!!!");
					} else {
						showSnackbar("Server msg: '"+response.data.msg+"'");
						console.info("[Admin Panel] Import Failed! Bad format?");
					}
				},
				function(response) {
					showSnackbar("Error received from server. Bad format?");
					console.info("[Admin Panel] Error received!");
				}
			);
		}

		$scope.downloadFile = function(){

		}
	}]);
