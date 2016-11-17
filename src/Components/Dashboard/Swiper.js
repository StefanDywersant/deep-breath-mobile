import React, { PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import NativeSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const renderPagination = function(index, total, context) {
	let dots = [];

	const LocalDotActive = <Ionicons name="ios-locate-outline" size={10} color="rgba(255, 255, 255, 1)" style={styles.paginationItem} />;
	const LocalDot = <Ionicons name="ios-locate-outline" size={10} color="rgba(255, 255, 255, .5)" style={styles.paginationItem} />;
	const DotActive = <View style={StyleSheet.flatten([styles.paginationItem, styles.dot, styles.activeDot])} />;
	const Dot = <View style={StyleSheet.flatten([styles.paginationItem, styles.dot])} />;

	for (let i = 0; i < total; i++) {
		if (i === index) {
			dots.push(i === 0
				? React.cloneElement(LocalDotActive, {key: i})
				: React.cloneElement(DotActive, {key: i}));
		} else {
			dots.push(i === 0
				? React.cloneElement(LocalDot, {key: i})
				: React.cloneElement(Dot, {key: i}));
		}

	}

	return (
		<View pointerEvents='none' style={styles.pagination}>
			{dots}
		</View>
	);
};

const Swiper = ({ children }) => {
	return (
		<NativeSwiper loop={false} renderPagination={renderPagination}>
			{children}
		</NativeSwiper>
	);
};

const styles = StyleSheet.create({
	pagination: {
		position: 'absolute',
		bottom: 18,
		left: 0,
		right: 0,
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	paginationItem: {
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3
	},
	dot: {
		backgroundColor: 'rgba(255, 255, 255, .5)',
		width: 8,
		height: 8,
		borderRadius: 4
	},
	activeDot: {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	}
});

Swiper.propTypes = {
	/**
	 * Inner element
	 */
	children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Swiper;
