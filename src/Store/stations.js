import CONFIG from '../config';
import entitize from './entitize/station';

const nearest = function(o) {
	const path = [
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

	return fetch(path.join('/') + '?' + Object.keys(qs).reduce((query, key) => query.concat([`${key}=${qs[key]}`]), []).join('&'))
		.then((response) => {
			if (response.status !== 200)
				throw new Error('Cannot fetch stations: ' + response.statusText);

			return response.json();
		})
		.then(apiStations => Promise.all(apiStations.map(entitize)));
};


const search = function(o) {
	const path = [
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

	return fetch(path.join('/') + '?' + Object.keys(qs).reduce((query, key) => query.concat([`${key}=${qs[key]}`]), []).join('&'))
		.then((response) => {
			if (response.status !== 200)
				throw new Error('Cannot fetch stations: ' + response.statusText);

			return response.json();
		})
		.then((apiStations) => Promise.all(apiStations.map(entitize)));
};


const all = function(o) {
	let allStations = [],
		i = 0;

	const request = function() {
		return search({query: '', offset: i, limit: 150, useful: o.useful})
			.then((stations) => {
				allStations = allStations.concat(stations);

				if (stations.length < 150)
					return;

				return fetch('', i += 150, 150);
			});
	};

	return request()
		.then(() => allStations);
};


const byUUID = function(uuid) {
	return fetch(CONFIG.BACKEND_URL + '/stations/uuid/' + uuid)
		.then(function(response) {
			if (response.status !== 200)
				throw new Error('Cannot fetch station ' + uuid + ': ' + response.statusText);

			return response.json();
		})
		.then(entitize);
};


export default {nearest, search, all, byUUID};
