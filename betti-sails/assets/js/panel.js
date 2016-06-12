
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
	['$scope', '$window', 'PanelComm',
	function($scope, $window, PanelComm){

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

	function makeFile(data){
		console.info(data);

		var now = new Date();

		var user_map = {};
		var user_id = 5;

		var json = {};
		json.group = [];

		json.users = [];
		for (var i = 0; i < data.users.length; i++) {
			
			user_map[data.users[i].login] = user_id++;
			
			json.users.push({});

			json.users[i].nome = data.users[i].uname.trim();
			json.users[i].login = data.users[i].login.trim();
			json.users[i].password = data.users[i].password.trim();
			json.users[i].birthday = data.users[i].birthday; 
			json.users[i].bio = "";
		}

		json.follow = [];
		for (var i = 0; i < data.follow.length; i++){
			
			json.follow.push({});

			json.follow[i].id = i;
			json.follow[i].follower = user_map[data.follow[i].ureceiver];
			json.follow[i].follows = user_map[data.follow[i].usender];
			json.follow[i].timestamp = now;
		}

		json.tweets = [];
		for (var i = 0; i < data.tweets.length; i++){
			
			json.tweets.push({});

			json.tweets[i].id = data.tweets[i].post_id;
			json.tweets[i].user = user_map[data.tweets[i].powner];
			json.tweets[i].title = data.tweets[i].title.trim();
			json.tweets[i].text = data.tweets[i].text.trim();
			json.tweets[i].timestamp = now;
		}

		json.reactions = [];
		for (var i = 0; i < data.post_reaction.length; i++){
			
			json.reactions.push({});

			json.reactions[i].tweet = data.post_reaction[i].post_id;
			json.reactions[i].user = user_map[data.post_reaction[i].preader];
			json.reactions[i].reaction = data.post_reaction[i].like_dislike == 1? 1:0;
		}

		json.share = [];
		for (var i = 0; i < data.fav_post.length; i++){
			
			json.share.push({});

			json.share[i].id = i;
			json.share[i].tweet = data.fav_post[i].post_id;
			json.share[i].user = user_map[data.fav_post[i].webuser];
			json.share[i].timestamp = now;
		}

		download(JSON.stringify(json, null, 2), "betti.json", "text/plain");
	}

	$scope.downloadFile = function(){
		PanelComm.download(null).then(
			function(response) {
				if(response.data.success){
					makeFile(response.data.result);
					showSnackbar("File Downloaded!");
					console.info(response);
				} else {
					console.info("[Admin Panel] Export Failed! Check the server");
				}
			},
			function(response) {
				console.info("[Admin Panel] Error received!");
			}
		);
	}
}]);
