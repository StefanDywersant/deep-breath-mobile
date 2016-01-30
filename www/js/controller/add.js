angular.module('deep-breath')
	.controller('AddCtrl', function($scope, $location, Stations, ChosenStations, $ionicScrollDelegate) {

		$scope.useful = true;

		$scope.loading = true;

		$scope.switchUseful = function(useful) {
			$scope.useful = useful;
			refresh();
			$ionicScrollDelegate.scrollTop(false);
		};

		var refresh = function() {
			$scope.loading = true;
			$scope.stationInfosByVoivodeships = [];

			Stations.all({useful: $scope.useful}).then(function(stations) {
				var stationInfosByVoivodeships = stations.map(function(station) {
					var date = station.channel_groups.reduce(function(maxEnd, channelGroup) {
						return maxEnd > channelGroup.end ? maxEnd : channelGroup.end;
					}, 0);

					var status = (function() {
						if (new Date(date).getTime() + (24 * 60 * 60 * 1000) >= Date.now())
							return 1;

						if (new Date(date).getTime() + (24 * 60 * 60 * 1000) < Date.now())
							return 0;

						return -1;
					})();

					return {
						station: station,
						last_measurement: {
							date: date ? new Date(date) : null,
							status: status
						}
					};
				}).reduce(function(result, stationInfo) {
					if (stationInfo.station.address.voivodeship in result)
						result[stationInfo.station.address.voivodeship].push(stationInfo);
					else
						result[stationInfo.station.address.voivodeship] = [stationInfo];

					return result;
				}, {});

				$scope.stationInfosByVoivodeships = Object.keys(stationInfosByVoivodeships).map(function(voivodeship) {
					return {
						voivodeship: voivodeship,
						stationInfos: stationInfosByVoivodeships[voivodeship]
					};
				}).sort(function(a, b) {
					return a.voivodeship > b.voivodeship ? 1 : -1;
				});

				$scope.loading = false;
			});
		};

		$scope.add = function(stationInfo) {
			ChosenStations.add(stationInfo.station);
			$location.path('/settings');
		};

		refresh($scope.useful);

	});

