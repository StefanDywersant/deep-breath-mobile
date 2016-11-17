import React, { PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from './Swiper';
import Station from './Station';

const GRADIENT_COLORS = [
	'rgba(153,204,255,1)',
	'rgba(0,114,188,1)'
];

const Dashboard = ({ stations }) => {
	return (
		<View>
			<LinearGradient colors={GRADIENT_COLORS} style={styles.gradient} />
			<View style={styles.footer} />
			<Swiper>
				{stations.map(station => <Station key={station.uuid} station={station} />)}
			</Swiper>
		</View>
	);
};

const styles = StyleSheet.create({
	gradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	footer: {
		position: 'absolute',
		height: 50,
		backgroundColor: 'rgba(0, 0, 0, .3)',
		bottom: 0,
		left: 0,
		right: 0
	}
});

Dashboard.propTypes = {
	stations: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Dashboard;
