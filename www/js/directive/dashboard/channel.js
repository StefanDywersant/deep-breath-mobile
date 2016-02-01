angular.module('deep-breath')
	.directive('dbDashboardChannel', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/dashboard/channel.html',
			scope: {
				channel: '='
			},
			link: function($scope, $element, $attr) {
				$element.addClass('row');
			}
		};
	});