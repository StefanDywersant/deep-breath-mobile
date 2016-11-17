import entitizeChannel from './channel';

export default (apiStation) => {
	const channels = apiStation.channel_groups
		.reduce((apiChannels, apiChannelGroup) => apiChannels.concat(apiChannelGroup.channels), [])
		.map(entitizeChannel);

	return {
		uuid: apiStation.uuid,
		name: apiStation.name,
		address: apiStation.address,
		location: apiStation.location,
		flags: apiStation.flags,
		channels: channels,
		parameter_groups: apiStation.parameter_groups
			.map((parameter_group) => {
				parameter_group.channels = parameter_group.parameters
					.map(parameterCode => channels.find(channel => channel.parameter.code == parameterCode))
					.filter(channel => channel);

				if (parameter_group.channels.length > 0 && parameter_group.channels[0].last_measurement)
					parameter_group.end = parameter_group.channels[0].last_measurement.end;

				return parameter_group;
			})
			.filter(parameterGroup => parameterGroup.channels.length),
		channel_groups: apiStation.channel_groups.map((channel_group) => {
			return {
				begin: new Date(channel_group.begin),
				end: new Date(channel_group.end),
				channels: channel_group.channels.map(apiChannel => channels.find(channel => channel.uuid == apiChannel.uuid)),
				index: channel_group.index
			}
		})
	};
};
