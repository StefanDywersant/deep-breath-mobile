angular.module('deep-breath')
	.filter('channelFind', function () {
		return function (channels, code) {
			return channels.reduce(function(found, channel) {
				if (found)
					return found;

				return channel.parameter.code == code ? channel : found;
			}, null);
		};
	})
	.filter('channelsGroup', function() {
		return function(allChannels, parameters) {
			return parameters.reduce(function(channels, parameterCode) {
				allChannels.forEach(function(channel) {
					if (channel.parameter.code == parameterCode)
						channels.push(channel);
				});

				return channels;
			}, []);
		};
	});