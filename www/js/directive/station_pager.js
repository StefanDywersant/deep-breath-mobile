angular.module('dbStationPager', [])
	.directive('dbStationPager', function($ionicSlideBoxDelegate, $interval) {
		return {
			restrict: 'E',
			templateUrl: 'templates/station_pager.html',
			scope: {
				slideBoxDelegateHandle: '@',
				stations: '='
			},
			link: function($scope, $element, $attr) {
				var slideBox = $ionicSlideBoxDelegate.$getByHandle($scope.slideBoxDelegateHandle),
					previousIndex;

				$element.addClass('db-station-pager');

				$scope.select = function(index) {
					slideBox.slide(index);
				};

				$scope.$watch('stations', function() {
					previousIndex = null;
				});

				$interval(function() {
					var currentIndex = slideBox.currentIndex();

					if (previousIndex !== currentIndex) {
						var children = $element.children();

						children.removeClass('selected');

						if (currentIndex < children.length)
							children.eq(currentIndex).addClass('selected');

						previousIndex = currentIndex;
					}
				}, 250);
			}
		};
	});