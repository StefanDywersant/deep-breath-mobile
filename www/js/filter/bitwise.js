angular.module('deep-breath')
	.filter('bitwiseAnd', function () {
		return function (a, b) {
			return ((parseInt(a, 10) & parseInt(b, 10)) === parseInt(b, 10));
		};
	});