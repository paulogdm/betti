
var angApp = angular.module("betti-profile-app", []);

angApp.controller('ProfileController', ['$scope', function($scope) { 

	$scope.profile_photo = './img/profile.jpg'; //substituir por uma funcao get
	$scope.cover_photo = './img/cover.jpg';  
	$scope.name = 'Steve';  
	$scope.last_name = 'Woggi';
	$scope.description = 'User description go here, user description go here.';
	
}]);


angApp.controller('PostsController', ['$scope', function($scope) { 

	$scope.allPosts = [ 
	{ 
		title: 'Titulo1',
		text: 'Lorem ipsum senectus habitant quisque litora scelerisque mollis massa primis himenaeos, hac id metus leo justo nam condimentum ullamcorper class aenean urna, morbi ligula ullamcorper fermentum duis tempus enim praesent quisque.',
		date: new Date('2016', '05', '04', '3', '21'),
		favorites: 99,
		likes: 01,
		forward: 02
	}, 
	{ 
		title: 'Titulo2',
		text: 'Text2',
		date: new Date('2016', '03', '08', '3', '55'),
		favorites: 99,
		likes: 01,
		forward: 02
	}
	]

}]);
