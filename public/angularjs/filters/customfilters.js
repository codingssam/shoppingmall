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
	});