angular.module('deep-breath')
	.factory('Stations', function(CONFIG, $http, $httpParamSerializer, $q) {


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


		var nearest = function(o) {
			var path = [
					CONFIG.BACKEND_URL,
					'stations/nearest',
					o.position.latitude + ',' + o.position.longitude
				],
				qs = {};

			if (typeof(o.distance) == 'number')
				qs.distance = o.distance;

			if (typeof(o.limit) == 'number')
				qs.limit = o.limit;

			if (typeof(o.useful) == 'boolean')
				qs.useful = o.useful ? 1 : 0;

			return $http.get(
				path.join('/') + '?' + $httpParamSerializer(qs)
			).then(function(response) {
				if (response.status !== 200)
					throw new Error('Cannot fetch stations: ' + response.statusText);

				return response.data;
			}).then(function(apiStations) {
				return $q.all(apiStations.map(entitize));
			});
		};


		var search = function(o) {
			var path = [
					CONFIG.BACKEND_URL + '/stations/search',
					o.query
				],
				qs = {};

			if (typeof(o.offset) == 'number')
				qs.offset = o.offset;

			if (typeof(o.limit) == 'number')
				qs.limit = o.limit;

			if (typeof(o.useful) == 'boolean')
				qs.useful = o.useful ? 1 : 0;

			return $http.get(
				path.join('/') + '?' + $httpParamSerializer(qs)
			).then(function (response) {
				if (response.status !== 200)
					throw new Error('Cannot fetch stations: ' + response.statusText);

				return response.data;
			}).then(function (apiStations) {
				return $q.all(apiStations.map(entitize));
			});
		};


		var all = function(o) {
			var allStations = [],
				i = 0;

			var fetch = function() {
				return search({query: '', offset: i, limit: 150, useful: o.useful}).then(function(stations) {
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