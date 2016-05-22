//LEVEL 2;

angular.module("betti-app").controller('ProfileController', ['$scope', function($scope) { 

	$scope.profile_photo = '/images/views/profile_default.png'; //substituir por uma funcao get
	$scope.cover_photo = '/images/views/cover_default.png';  
	$scope.name = 'Steve';
	$scope.last_name = 'Woggi';
	$scope.description = 'User motto go here.';
	$scope.birthday = new Date('0', '11', '09');
}]);

angular.module("betti-app").controller('StyleController', ['$scope', function($scope){

	var num = 6; // GET
	$scope.color_mdl_class_profile = styleSwitch(num); //STYLE.JS
	$scope.color_mdl_class_profile_contrast = styleSwitchBar(num); //STYLE.JS

}]);


angular.module("betti-app").controller('PostsController', ['$scope', function($scope){ 

	$scope.allPosts = [ 
	{ 
		title: 'Titulo1',
		text: 'Lorem ipsum senectus habitant quisque litora scelerisque mollis massa primis himenaeos, hac id metus leo justo nam condimentum ullamcorper class aenean urna, morbi ligula ullamcorper fermentum duis tempus enim praesent quisque.',
		date: new Date('2016', '05', '04', '3', '21'),
		favorites: 99,
		likes: 01,
		dislikes: 02,
		forward: 03,
		liked: false,
		favorited: false,
		shared: false
	}, 
	{ 
		title: 'Titulo2',
		text: 'Text2',
		date: new Date('2016', '03', '08', '3', '55'),
		favorites: 99,
		likes: 01,
		dislikes: 02,
		forward: 02,
		liked: true,
		favorited: true,
		shared: true
	}
	]

}]);


angular.module("betti-app").controller('PostActionController', ['$scope', function($scope){ 


}]);

angular.module("betti-app").controller('AllFavoritesController', ['$scope', function($scope){ 
		$scope.allFavorites = [ 
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

angular.module("betti-app").controller('AllFriendsController', ['$scope', function($scope){ 
	$scope.allFriends = [
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
		{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},
	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi1',
		following: true
	},

	{
		profile_photo: '/images/views/profile_default.png', //substituir por uma funcao get
		name: 'Steve1',
		last_name: 'Woggi2',
		following: false
	}
	]

}]);

angular.module("betti-app").controller('AllGroupsController', ['$scope', function($scope){ 
	$scope.allGroups = [
	{
		profile_photo: '/images/views/cover_default.png', //substituir por uma funcao get
		name: 'Group1',
		following: true
	}
	]
}]);
