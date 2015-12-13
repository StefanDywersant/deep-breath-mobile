angular.module('deep-breath')
	.factory('Stations', function(CONFIG, $http, $q) {


		var entitize = function(apiStation) {
			return {
				uuid: apiStation.uuid,
				name: apiStation.name,
				address: apiStation.address,
				location: apiStation.location,
				flags: apiStation.flags,
				parameter_groups: apiStation.parameter_groups,
				channel_groups: apiStation.channel_groups.map(function(channel_group) {
					return {
						begin: new Date(channel_group.begin),
						end: new Date(channel_group.end),
						channels: channel_group.channels.map(function(channel) {
							return {
								uuid: '',
								last_measurement: {
									begin: channel.last_measurement.begin,
									end: channel.last_measurement.end,
									value: channel.last_measurement.value
								},
								parameter: channel.parameter,
								index: channel.index
							}
						}),
						index: channel_group.index
					}
				})
			};
		};


		var nearest = function(position) {
			return $http.get(
				CONFIG.BACKEND_URL + '/stations/nearest/' + position.latitude + ',' + position.longitude
			).then(function(response) {
				if (response.status !== 200)
					throw new Error('Cannot download database: ' + response.statusText);

				return response.data;
			}).then(function(apiStations) {
				return $q.all(apiStations.map(entitize));
			});
		};


		return {
			nearest: nearest
		}


	});