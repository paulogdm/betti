
var angApp = angular.module("betti-profile-app", []);

angApp.controller('ProfileController', ['$scope', function($scope) { 

	$scope.profile_photo = './img/profile.jpg'; //substituir por uma funcao get
	$scope.cover_photo = './img/cover.jpg';  
	$scope.name = 'Steve';  
	$scope.last_name = 'Wonder';  
	
}]);


angApp.controller('PostsController', ['$scope', function($scope) { 


	$scope.allPosts = [ 
	{ 
		title: 'TESTE1',
		text: 'TESTE1'
	}, 
	{ 
		title: 'TESTE2',
		text: 'TESTE2'
	} 
	]

}]);
