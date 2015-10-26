angular.module('deep-breath')
	.controller('HomeCtrl', function($scope, $ionicPlatform, $cordovaGeolocation, Stations, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

		var slideBox = $ionicSlideBoxDelegate.$getByHandle('stations');

		$ionicPlatform.ready(function() {
			$cordovaGeolocation.getCurrentPosition().then(function(position) {
				return Stations.nearest({
					longitude: position.coords.longitude,
					latitude: position.coords.latitude
				});
			}).then(function(stations) {
				$scope.stations = stations;
				slideBox.update();
			}, function(error) {
				console.log(error.stack);
			});
		});


		$scope.slideChanged = function(index) {
			setTimeout(function() {
				$ionicScrollDelegate.scrollTop(false);
			}, 50);
		};

	});

