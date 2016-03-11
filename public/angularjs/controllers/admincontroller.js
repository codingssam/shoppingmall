angular.module('shoppingMallAdmin')
	.constant('authUrl', 'http://localhost/admin/login')
	.controller('authController', function($scope, $http, $location, authUrl) {
		$scope.authenticate = function(username, password) {
			var data = {
				username: username,
				password: password
			};
			var options = {
				withCredentials: true
			};
			$http.post(authUrl, data, options)
				.success(function(data) {
					$location.path('/main');
				})
				.error(function(err) {
					$scope.authenticateError = err;
				});
		};
	});