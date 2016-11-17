import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import WeatherParameterIcon from '../WeatherParameterIcon';
import AirParameterIcon from '../AirParameterIcon';

const ChannelParameterIcon = ({ channel }) => {
	return (
		<View style={styles.general}>
			{WeatherParameterIcon.hasIcon(channel.parameter.code) &&
				<WeatherParameterIcon
					parameterCode={channel.parameter.code}
					measurementValue={channel.last_measurement.value}
					style={styles.weatherIcon}
				/>}
			{channel.index &&
				<AirParameterIcon score={channel.index.score} />}
		</View>
	);
};

const styles = StyleSheet.create({
	general: {
		flex: 0,
		width: 30
	},
	weatherIcon: {
		width: 30,
		alignItems: 'center'
	}
});

ChannelParameterIcon.propTypes = {
	channel: PropTypes.object.isRequired
};

export default ChannelParameterIcon;
