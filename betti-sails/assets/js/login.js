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

function trySignup(){
	// create?login=test&password=12345&name=testname&birthday=112
	var suSuc = "Welcome! Now you can try your brand new login!"; 
	var suErr = "Sorry! Something is not right...";

	showSnackbar("Working...");
	
	// if()
	showSnackbar(suSuc);
	// else showSnackbar(suErr);
}

function tryLogin(){

	showSnackbar("Working...");

	var loginErr = "Invalid credentials.";
	var loginSuc = "Welcome again!";

	// if( )
	showSnackbar(loginSuc);
	// else showSnackbar(logiErr);
}

/////////////
// ANGULAR //
/////////////

var angApp = angular.module("betti-login-app", []);


angApp.controller('BGController', ['$scope', function($scope) { 
	var imgCount = 5; //number of images

	var dir = 'images/views/';
	var basename = 'login'
	var filetype = '.jpg'

	var randomCount = Math.floor(Math.random() * (imgCount))+1;

	$scope.backgroundImage = "url(" + dir + basename + randomCount.toString() 
	+ filetype + ") no-repeat center center fixed";

}]);

angApp.controller('LoginController', ['$scope', function($scope) { 
}]);

angApp.controller('SignupController', ['$scope', function($scope) { 
}]);

