//LEVEL 2;

angular.module("betti-app").controller('ProfileController', ['$scope', function($scope) { 

	$scope.profile_photo = '/images/views/profile_default.png'; //substituir por uma funcao get
	$scope.cover_photo = '/images/views/cover_default.png';  
	$scope.name = 'Steve';
	$scope.last_name = 'Woggi';
	$scope.description = 'User description go here, user description go here.';
}]);

angular.module("betti-app").controller('StyleController', ['$scope', function($scope) { 

	var num = 1; // GET
	$scope.color_mdl_class_profile = styleSwitch(num); //STYLE.JS

}]);


angular.module("betti-app").controller('PostsController', ['$scope', function($scope) { 

	$scope.allPosts = [ 
	{ 
		title: 'Titulo1',
		text: 'Lorem ipsum senectus habitant quisque litora scelerisque mollis massa primis himenaeos, hac id metus leo justo nam condimentum ullamcorper class aenean urna, morbi ligula ullamcorper fermentum duis tempus enim praesent quisque.',
		date: new Date('2016', '05', '04', '3', '21'),
		favorites: 99,
		likes: 01,
		forward: 02,
		liked: false,
		favorited: true,
		shared: false
	}, 
	{ 
		title: 'Titulo2',
		text: 'Text2',
		date: new Date('2016', '03', '08', '3', '55'),
		favorites: 99,
		likes: 01,
		forward: 02,
		liked: true,
		favorited: false,
		shared: true
	}
	]

}]);

angular.module("betti-app").controller('PostActionController', ['$scope', function($scope) { 

}]);
