angular.module('shoppingMall')
	.constant('productListActiveClass', 'btn-primary')
	.controller('productListController', function($scope, productListActiveClass) {

		var currentCategory = undefined;

		$scope.selectCategory = function(category) {
			currentCategory = category;
		};

		$scope.categoryFilterFn = function(item) {
			return currentCategory === undefined || item.category === currentCategory;
		};

		$scope.getCategoryClass = function(category) {
			return currentCategory === category ? productListActiveClass: "";
		}

	});