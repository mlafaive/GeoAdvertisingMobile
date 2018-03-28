import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#DDDDDD',
	},
	loader: {
		flex: 1,
		justifyContent: 'center'
	},
	info: {
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 20,
		alignItems: 'center'
	},
	address: {
		fontSize: 15,
		color: '#0074D9',
		textDecorationLine: 'underline',
		textDecorationColor: '#0074D9'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: 10,
		backgroundColor: '#0074D9',
	},
	close: {
		position: 'absolute',
		left: 15,
		top: -2.5
	},
	headerText: {
		fontSize: 20,
		color: '#FFFFFF',
		fontWeight: '900'
	},
	icon: {
		color: '#FFFFFF',
	},
	body: {
		flex: 1
	},
	offerHeader: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	offerHeaderText: {
		fontSize: 17.5,
	},
	offers: {
		flex: 1
	},
	create: {
		position: 'absolute',
		top: -7.5,
		right: 15,
		width: 30,
		height: 30,
		backgroundColor: '#DDDDDD'
	},
	createIcon: {
		color: '#79C753'
	},
	createScreen: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 200
	}
});