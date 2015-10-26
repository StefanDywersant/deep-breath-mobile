angular.module('deep-breath')
	.factory('Stations', function(CONFIG, $http) {


		var nearest = function(position) {
			return $http.get(
				CONFIG.BACKEND_URL + '/stations/nearest/' + position.latitude + ',' + position.longitude
			).then(function(response) {
				if (response.status !== 200)
					throw new Error('Cannot download database: ' + response.statusText);

				return response.data;
			});
		};


		return {
			nearest: nearest
		}


	});