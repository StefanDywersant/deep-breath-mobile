angular.module('deep-breath')
	.controller('HomeCtrl', function($scope, $q, $ionicPlatform, $cordovaGeolocation, Stations, $ionicSlideBoxDelegate, $ionicScrollDelegate, CONFIG) {

		var slideBox = $ionicSlideBoxDelegate.$getByHandle('stations');

		var refresh = function() {
			return $cordovaGeolocation.getCurrentPosition().then(function(position) {
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
		};

		$ionicPlatform.ready(function() {
			document.addEventListener('resume', refresh, false);
			setInterval(refresh, CONFIG.TTL);
			refresh();
		});

		$scope.slideChanged = function(index) {
			setTimeout(function() {
				$ionicScrollDelegate.scrollTop(false);
			}, 50);
		};

	});

