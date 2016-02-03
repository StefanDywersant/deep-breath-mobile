angular.module('deep-breath')
	.directive('dbParameterName', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/parameter_name.html',
			scope: {
				code: '='
			}
		};
	});