angular.module('deep-breath')
	.directive('dbStationAddress', function() {
		return {
			restrict: 'A',
			templateUrl: 'templates/station/address.html',
			scope: {
				address: '='
			},
			link: function($scope, $element, $attr) {

			}
		};
	});