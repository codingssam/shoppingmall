angular.module('cart', [])
	.factory('cart', function() {
		var cartData = [];
		return {
			addProduct: function(id, name, price) {
				var existingItem = false;
				for(var i = 0; i < cartData.length; i++) {
					if (cartData[i].id === id) {
						cartData[i].count++;
						existingItem = true;
						break;
					}
				}
				if (!existingItem) {
					cartData.push({
						"id": id,
						"name": name,
						"price": price,
						"count": 1
					});
				}
			},
			removeProduct: function(id) {
				for(var i = 0; i < cartData.length; i++) {
					if (cartData[i].id === id) {
						cartData.splice(i, 1);
						break;
					}
				}
			},
			getProducts: function() {
				return cartData;
			}
		};
	})
	.directive('cartSummary', function(cart) {
		return {
			restrict: 'E',
			templateUrl: 'angularjs/components/cart/cartsummary.html',
			controller: function($scope) {
				var cartData = cart.getProducts();
				$scope.totalPrice = function() {
					var total = 0;
					for(var i = 0; i < cartData.length; i++) {
						total += cartData[i].price * cartData[i].count;
					}
					return total;
				};
				$scope.itemCount = function() {
					var total = 0;
					for(var i = 0; i < cartData.length; i++) {
						total += cartData[i].count;
					}
					return total;
				}
			}
		}
	});

