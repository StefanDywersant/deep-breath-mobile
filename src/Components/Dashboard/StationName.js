import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StationName = ({ name }) => {
	return (
		<Text style={styles.general}>
			<Icon name="ios-pin" size={14} />
			&nbsp;
			{name}
		</Text>
	);
};

const styles = StyleSheet.create({
	general: {
		fontSize: 14,
		fontFamily: 'Open Sans',
		textAlign: 'center',
		margin: 28,
		backgroundColor: 'transparent',
		color: "#fff"
	}
});

StationName.propTypes = {
	/**
	 * Station name
	 */
	name: PropTypes.string.isRequired
};

export default StationName;
