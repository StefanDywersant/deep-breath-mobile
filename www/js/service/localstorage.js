angular.module('deep-breath')
	.factory('$localStorage', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			get: function(key) {
				if (typeof($window.localStorage[key]) != 'string')
					return null;

				return JSON.parse($window.localStorage[key]);
			}
		}
	}]);