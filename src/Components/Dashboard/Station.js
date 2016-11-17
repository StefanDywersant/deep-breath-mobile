import React, { PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StationName from './StationName';
import Summary from './Summary';
import Channel from './Channel';
import ChannelGroupHeader from './ChannelGroupHeader';
import ChannelParameterIcon from './ChannelParameterIcon';
import ChannelParameterName from './ChannelParameterName';
import ChannelMeasurementValue from './ChannelMeasurementValue';

const Station = ({station}) => {
	return (
		<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
			<StationName name={station.name} />

			{station.channel_groups[0].index &&
				<Summary index={station.channel_groups[0].index} />}

			{station.parameter_groups.map(parameterGroup => [
				<ChannelGroupHeader name={parameterGroup.name} updated={parameterGroup.end} />,
				parameterGroup.channels.map(channel => (
					<Channel>
						<ChannelParameterIcon channel={channel} />
						<ChannelParameterName code={channel.parameter.code} />
						<ChannelMeasurementValue
							value={channel.last_measurement.value}
							format={channel.parameter.unit.format}
							code={channel.parameter.code}
						/>
					</Channel>
				))
			])}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: 'transparent'
	},
	scrollViewContent: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

Station.propTypes = {
	station: PropTypes.object.isRequired
};

export default Station;
