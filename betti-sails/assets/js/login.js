
var GLOBAL_URL_TO_CREATE = "/user";
var GLOBAL_URL_TO_LOGIN = "/auth/login";


///////////
//MDL JS //
///////////

function showDialog(){ 

	var dialog = document.querySelector('dialog'); 
	var showDialogButton = document.querySelector('#signup'); 
	if (! dialog.showModal){ 
		dialogPolyfill.registerDialog(dialog); 
	} 

	dialog.showModal(); 
} 


function hideDialog(){ 
	var dialog = document.querySelector('dialog'); 
	dialog.close(); 
} 

function showSnackbar(msg){ 
	var notification = document.querySelector('#snackbar-show'); 
	var data = { 
		message: msg, 
		timeout: 2000 
	}; 
	notification.MaterialSnackbar.showSnackbar(data); 
} 


////////////
//ANGULAR //
////////////

var angApp = angular.module("betti-login-app", []);

angApp.factory('UserService', function($http) {
	return {
		'create': function(data) {
			return $http.post(GLOBAL_URL_TO_CREATE, data);
		},

		'login': function(data) {
			return $http.post(GLOBAL_URL_TO_LOGIN, data);
		}
	}
});

angApp.controller('MainController', ['$scope', 'UserService', function($scope, UserService) { 

	angular.isUndefinedOrNull = function(val) {
		return angular.isUndefined(val) || val === null 
	}

	$scope.submitLogin = function (){

		var msgSuc = "Welcome again!";
		var msgErr = "Error received from server. Sorry!";
		var msgFail = "Invalid credentials.";
		var flag = false;

		
		if (
			angular.isUndefinedOrNull($scope.user)					|| 
			angular.isUndefinedOrNull($scope.user.login)			|| 
			angular.isUndefinedOrNull($scope.user.password)
			){
			showSnackbar(msgErr+" Check your information please...");

	} else {
		var login = $scope.user.login;
		var password = $scope.user.password;

		var data = {
			login: login,
			password: password
		}

		UserService.login(data).then(
			function(response) {
				if(response.data.success){
					console.info("[Login] Success!!!");

					var now = new Date();
					var time = now.getTime();
						time += 20*60*60*1000; //20h
						now.setTime(time);
						document.cookie = "token="+response.data.token+
						'; expires=' + now.toUTCString() + '; Path=/;';


						console.info(response.data);
						showSnackbar(msgSuc);

						if(data.login == 'admin') 
							window.location.href = '/adminspace/adminpanel/';
						else 
							window.location.href = '/userspace/profile/'+data.login;

				} else {
					console.info("[Login] Failed!");
					showSnackbar(msgFail);
				}

			},
			function(response) {
				showSnackbar(msgErr);
				console.info("[Login] Error received!");
			}
		);
	}
}

$scope.submitNewLogin = function (){

	var msgSuc = "Welcome! Now you can try your brand new login!"; 
	var msgErr = "Sorry! Something is not right.";


	if (
		angular.isUndefinedOrNull($scope.user)					|| 
		angular.isUndefinedOrNull($scope.user.new_login)		|| 
		angular.isUndefinedOrNull($scope.user.new_password)		|| 
		angular.isUndefinedOrNull($scope.user.new_name)			|| 
		angular.isUndefinedOrNull($scope.user.new_date) 
		){
		showSnackbar(msgErr+" Check your information please...");

} else {
	var newLogin = $scope.user.new_login;
	var newPass = $scope.user.new_password;
	var newName = $scope.user.new_name;
	var newBirth = $scope.user.new_date;

	var data = {
		login: newLogin,
		password: newPass,
		uname: newName,
		birthday: newBirth
	};

	UserService.create(data).then(
		function(response) {
			showSnackbar(msgSuc);
			console.info("[Signup] Success!!!");
			console.info(response.data);
			hideDialog();
		},
		function(response) {
			showSnackbar(msgErr);
			console.info("[Signup] Error received!");
		}
		);
}
}
}]);

angApp.controller('BGController', ['$scope', function($scope) { 
	var imgCount = 4; //number of images

	var dir = 'images/views/';
	var basename = 'login'
	var filetype = '.jpg'

	var randomCount = Math.floor(Math.random() * (imgCount))+1;

	$scope.backgroundImage = "url(" + dir + basename + randomCount.toString() 
	+ filetype + ") no-repeat center center fixed";

}]);

