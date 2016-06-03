var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

angular.module("betti-app").factory('JWTInterceptor', [function(){  

	var jwtHandler = {
		request: function(config) {
			if(cookieValue){
				console.info(cookieValue);
				config.headers.Authorization = 'Bearer ' + cookieValue;
				return config;
			}
		},
		response: function (response) {
			if (response.status === 401) {
				window.location.href = '/';
			}
			return response || $q.when(response);
		}
	};

	return jwtHandler;
}]);

angular.module("betti-app").config(['$httpProvider', function($httpProvider) {  
	$httpProvider.interceptors.push('JWTInterceptor');
}]);
