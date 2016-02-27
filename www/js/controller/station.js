angular.module('deep-breath')
	.controller('StationCtrl', function($scope, $stateParams, $q, $ionicHistory, $location, Stations, uiGmapGoogleMapApi, ChosenStations) {

		$scope.back = $ionicHistory.goBack;

		$scope.showAdd = $stateParams.showadd == '1';

		$q.all([
			Stations.byUUID($stateParams.uuid),
			uiGmapGoogleMapApi
		]).spread(function(station, maps) {
			$scope.station = station;
			$scope.map = {
				center: {
					latitude: station.location.latitude,
					longitude: station.location.longitude
				},
				zoom: 10
			};
		});

		$scope.add = function(station) {
			ChosenStations.add(station);
			$location.path('/settings');
		};


	});

