import entitizeMeasurement from './measurement';

export default (apiChannel) => {
	return {
		uuid: apiChannel.uuid,
		last_measurement: entitizeMeasurement(apiChannel.last_measurement),
		parameter: apiChannel.parameter,
		index: apiChannel.index,
		flags: apiChannel.flags
	};
};
