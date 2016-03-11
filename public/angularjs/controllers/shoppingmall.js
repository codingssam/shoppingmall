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
		  //var order;
		  //// ...
		  //$http.post(orderUrl, order)
			 // .success(function(data) {
		  //
			 // })
			 // .error(function(err) {
		  //
			 // })
			 // .finally(function() {
				//  $location.path('/complete');
			 // });
	  };
  });