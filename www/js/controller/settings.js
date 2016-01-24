angular.module('deep-breath')
	.controller('SettingsCtrl', function($scope, ChosenStations) {

		ChosenStations.all().then(function(stations) {
			$scope.stationInfos = stations.map(function(station) {
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
			});
		});

		$scope.delete = function(stationInfo) {
			ChosenStations.remove(stationInfo.station);
			$scope.stationInfos.splice($scope.stationInfos.indexOf(stationInfo), 1);
		};

	});

