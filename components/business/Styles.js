import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#DDDDDD'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 25,
		paddingBottom: 10,
		backgroundColor: '#0074D9',
	},
	close: {
		position: 'absolute',
		left: 0,
		paddingTop: 25,
		paddingLeft: 10
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
	offers: {
		flex: 1
	},
});