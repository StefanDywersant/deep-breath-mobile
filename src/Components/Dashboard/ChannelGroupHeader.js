import React, { PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeAgo from 'react-native-timeago';

const ChannelGroupHeader = ({ name, updated }) => {
	return (
		<View style={styles.header}>
			<Text style={styles.name}>{name.toUpperCase()}</Text>
			<Text style={styles.updated}>
				<Ionicons name="ios-clock-outline" size={8} />
				&nbsp;
				<TimeAgo time={updated} />
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255,255,255,0.4)",
		flexDirection: 'row',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 11,
		marginBottom: 11
	},
	name: {
		color: 'rgba(255,255,255,0.7)',
		fontSize: 11,
		fontFamily: 'Open Sans',
		flex: 1
	},
	updated: {
		color: 'rgba(255,255,255,0.7)',
		fontFamily: 'Open Sans',
		fontSize: 9,
		flex: 1,
		textAlign: 'right',
		marginTop: 3
	}
});

ChannelGroupHeader.propTypes = {
	/**
	 * Channel group name
	 */
	name: PropTypes.string.isRequired,

	/**
	 * Channel group updated time
	 */
	updated: PropTypes.instanceOf(Date).isRequired
};

export default ChannelGroupHeader;
