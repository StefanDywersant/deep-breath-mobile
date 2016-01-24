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


		var nearest = function(position, distance, limit) {
			var path = [
				CONFIG.BACKEND_URL,
				'stations/nearest',
				position.latitude + ',' + position.longitude,
				distance ? distance : CONFIG.NEAREST_DISTANCE
			];

			if (limit)
				path.push(limit);

			return $http.get(path.join('/')).then(function(response) {
				if (response.status !== 200)
					throw new Error('Cannot fetch stations: ' + response.statusText);

				return response.data;
			}).then(function(apiStations) {
				return $q.all(apiStations.map(entitize));
			});
		};


		var search = function(query, offset, limit) {
			var path = [CONFIG.BACKEND_URL + '/stations/search', query];

			if (typeof(offset) == 'number')
				path.push(offset);

			//@todo: fix - what if offset is not defined?
			if (typeof(limit) == 'number')
				path.push(limit);

			return $http.get(path.join('/')).then(function (response) {
				if (response.status !== 200)
					throw new Error('Cannot fetch stations: ' + response.statusText);

				return response.data;
			}).then(function (apiStations) {
				return $q.all(apiStations.map(entitize));
			});
		};


		var all = function() {
			var allStations = [],
				i = 0;

			var fetch = function() {
				return search('', i, 150).then(function(stations) {
					allStations = allStations.concat(stations);

					if (stations.length < 150)
						return;

					return fetch('', i += 150, 150);
				});
			};

			return fetch().then(function() {
				return allStations;
			});
		};


		var byUUID = function(uuid) {
			return $http.get(
				CONFIG.BACKEND_URL + '/stations/uuid/' + uuid
			).then(function(response) {
				if (response.status !== 200)
					throw new Error('Cannot fetch station ' + uuid + ': ' + response.statusText);

				return response.data;
			}).then(entitize);
		};


		return {
			nearest: nearest,
			search: search,
			all: all,
			byUUID: byUUID
		}


	});