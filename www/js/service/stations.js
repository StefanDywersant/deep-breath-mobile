angular.module('deep-breath')
	.factory('Stations', function(CONFIG, $http, $q) {


		var entitize = function(station) {
			station.channel_groups.forEach(function(channel_group) {
				channel_group.begin = new Date(channel_group.begin);
				channel_group.end = new Date(channel_group.end);
			});

			return station;
		};


		var nearest = function(position) {
			return $http.get(
				CONFIG.BACKEND_URL + '/stations/nearest/' + position.latitude + ',' + position.longitude
			).then(function(response) {
				if (response.status !== 200)
					throw new Error('Cannot download database: ' + response.statusText);

				return response.data;
			}).then(function(stations) {
				return $q.all(stations.map(entitize));
			});
		};


		return {
			nearest: nearest
		}


	});