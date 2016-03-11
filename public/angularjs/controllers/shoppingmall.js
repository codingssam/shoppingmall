angular.module('shoppingMall')
	.constant('dataUrl', 'http://localhost/products')
	.constant('orderUrl', 'http://localhost/orders')
  .controller('shoppingMallController', function($scope, $http, $location,
                                                 dataUrl, orderUrl, cart) {

	  $scope.data = {};

	  $http.get(dataUrl)
		  .success(function(data) {
			  $scope.data.products = data;
		  })
		  .error(function(err) {
			  $scope.data.error = err;
		  });

	  $scope.sendOrder = function(shippingDetails) {
		  var order = angular.copy(shippingDetails);
		  order.products = cart.getProducts(); // id, name, price, count
		  $http.post(orderUrl, order)
			  .success(function(data) {
				  $scope.data.orderId = data.id;
					cart.getProducts().length = 0;
			  })
			  .error(function(err) {
					$scope.data.orderError = err;
			  })
			  .finally(function() {
				  $location.path('/complete');
			  });
	  };
  });