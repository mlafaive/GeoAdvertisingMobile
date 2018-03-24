import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#DDDDDD',
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
	offerHeaderText: {
		fontSize: 17.5,
	},
	offers: {
		flex: 1
	},
});