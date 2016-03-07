angular.module('shoppingMall')
	.controller('checkoutSummaryController', function($scope, cart) {
		$scope.cartData = cart.getProducts();

	});