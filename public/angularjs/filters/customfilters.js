angular.module('customFilters', [])
	.filter('unique', function() {
		return function(data, propName) {
			if (angular.isArray(data) && angular.isString(propName)) {
				var results = [];
				var keys = {};
				for (var i = 0; i < data.length; i++) {
					var value = data[i][propName];
					if (angular.isUndefined(keys[value])) {
						keys[value] = true;
						results.push(value);
					}
				}
				return results;
			} else {
				return data;
			}
		};
	})
	.filter('range', function($filter) {
		return function(data, page, size) {
			if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
				var startIndex = (page - 1) * size;
				if (data.length < startIndex) {
					return [];
				} else {
					return $filter('limitTo')(data.splice(startIndex), size);
				}
			} else {
				return data;
			}
		};
	})
	.filter('pageCount', function() {
		return function(data, size) {
			if (angular.isArray(data)) {
				var results = [];
				for (var i = 0; i < Math.ceil(data.length / size); i++) {
					results.push(i);
				}
				return results;
			} else {
				return data;
			}
		};
	});