
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

var angApp = angular.module("betti-login-app", []);


angApp.controller('LoginController', ['$scope', function($scope) { 
	var imgCount = 5; //number of images

	var dir = 'images/views/';
	var basename = 'login'
	var filetype = '.jpg'

	var randomCount = Math.floor(Math.random() * (imgCount))+1;

	$scope.backgroundImage = "url(" + dir + basename + randomCount.toString() + filetype + ")";

}]);
