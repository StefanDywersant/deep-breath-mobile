angular.module('deep-breath')
	.factory('ChosenStations', function(CONFIG, $http, $q, $localStorage, Stations) {


		var KEY = 'chosen-stations';


		var add = function(station) {
			remove(station);

			var chosenStations = $localStorage.get(KEY) || [];

			chosenStations.push(station.uuid);
			$localStorage.set(KEY, chosenStations);
		};


		var remove = function(station) {
			var chosenStations = ($localStorage.get(KEY) || []).filter(function(uuid) {
				return uuid != station.uuid;
			});

			$localStorage.set(KEY, chosenStations);
		};


		var all = function() {
			return $q.all(($localStorage.get(KEY) || []).map(Stations.byUUID));
		};


		return {
			add: add,
			remove: remove,
			all: all
		}


	});