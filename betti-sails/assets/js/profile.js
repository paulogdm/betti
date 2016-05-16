
var angApp = angular.module("betti-profile-app", []);


angApp.controller('SideBarController', ['$scope', function($scope) { 

	$scope.user_name = 'Steve Woggi'; //substituir por uma funcao get
	$scope.user_avatar = '/images/views/profile_default.png'; //substituir por uma funcao get
}]);

angApp.controller('ProfileController', ['$scope', function($scope) { 

	$scope.profile_photo = '/images/views/profile_default.png'; //substituir por uma funcao get
	$scope.cover_photo = '/images/views/cover_default.png';  
	$scope.name = 'Steve';
	$scope.last_name = 'Woggi';
	$scope.description = 'User description go here, user description go here.';

	var num = 0; //GET
	$scope.color_mdl_class_profile = styleSwitch(num); //SYLE.JS

}]);

angApp.controller('StyleController', ['$scope', function($scope) { 

	var num = 0; // GET
	$scope.color_mdl_class_page = styleSwitch(num); //STYLE.JS

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
