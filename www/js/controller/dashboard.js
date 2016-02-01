angular.module('deep-breath')
	.controller('DashboardCtrl', function($scope, $q, ChosenStations, $ionicPlatform, $cordovaGeolocation, Stations, $ionicSlideBoxDelegate, $ionicScrollDelegate, CONFIG) {

		var slideBox = $ionicSlideBoxDelegate.$getByHandle('stations');

		var fetchStations = function(position) {
			return $q.all([
				Stations.nearest({position: position, useful: true}),
				ChosenStations.all()
			]).spread(function(nearestStations, chosenStations) {
				return nearestStations
					.slice(0, 1)
					.concat(chosenStations)
			});
		};

		var refresh = function() {
			return $cordovaGeolocation.getCurrentPosition().then(function(position) {
				return fetchStations({
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

