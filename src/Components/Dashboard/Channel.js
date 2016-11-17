import React, { PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';

const Channel = ({ children }) => {
	return (
		<View style={styles.channel}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	channel: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		alignItems: 'center'
	}
});

Channel.propTypes = {
	/**
	 * Channel inner elements
	 */
	children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Channel;
