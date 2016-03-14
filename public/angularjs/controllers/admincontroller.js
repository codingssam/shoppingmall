angular.module('shoppingMallAdmin')
	.constant('authUrl', 'http://localhost/admin/login')
	.constant('ordersUrl', 'http://localhost/orders')
	.constant('productsUrl', 'http://localhost/products/')
	.constant('productMgmt', '상품관리')
	.constant('orderMgmt', '주문관리')
	.config(function($httpProvider) {
		$httpProvider.defaults.withCredentials = true;
	})
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
	})
	.controller('adminMainController', function($scope, productMgmt, orderMgmt) {
		$scope.screens = [productMgmt, orderMgmt];
		$scope.currentScreen = $scope.screens[0];

		$scope.getScreen = function() {
			switch ($scope.currentScreen) {
			case productMgmt:
				return "angularjs/views/adminproducts.html";
			case orderMgmt:
				return "angularjs/views/adminorders.html";
			default:
				return "angularjs/views/adminproducts.html";
			}
		};

		$scope.setScreen = function(index) {
			$scope.currentScreen = $scope.screens[index];
		};

	})
	.controller('adminOrdersController', function($scope, $http, ordersUrl) {
		$scope.orders = [];

		$http({
			url: ordersUrl,
			method: 'GET'
		}).success(function(data) {
			$scope.orders = data;
		}).error(function(err) {
			$scope.ordersError = err;
		});

		$scope.selectedOrder;

		$scope.selectOrder = function(order) {
			$scope.selectedOrder = order;
		};

		$scope.calcTotal = function(order) {
			var total = 0;
			for (var i = 0; i < order.products.length; i++) {
				total += order.products[i].price * order.products[i].count;
			}
			return total;
		}
	})
	.controller('adminProductsController', function($scope, productsUrl, $resource) {
		$scope.productsResource = $resource(productsUrl + ":id", {id: "@id"});

		$scope.listProducts = function() {
			$scope.products = $scope.productsResource.query();
		};

		$scope.createProduct = function(product) {
			new $scope.productsResource(product).$save().then(function(newProduct) {
				$scope.products.push(newProduct);
				$scope.editedProduct = null;
			})
		};

		$scope.updateProduct = function(product) {
			product.$save(); // PUT http://localhost/products/:id
			$scope.editedProduct = null;
		};

		$scope.deleteProduct = function(product) {
			product.$delete().then(function() {
				$scope.products.splice($scope.products.indexOf(product), 1);
			});
		};

		$scope.startEdit = function(product) {
			$scope.editedProduct = product;
		};

		$scope.cancelEdit = function() {
			$scope.editedProduct = null;
		};

		$scope.listProducts();

	});