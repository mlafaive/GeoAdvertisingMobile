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
	createScreen: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 200
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
	edit: {
		position: 'absolute',
		right: 15,
		top: -2.5
	},
	icon: {
		color: '#FFFFFF',
	},
	headerText: {
		fontSize: 20,
		color: '#FFFFFF',
		fontWeight: '900'
	},
	body: {
		flex: 1
	},
	business: {
		padding: 10,
	},
	businessText: {
		color: '#0074D9',
		fontSize: 20,
		textDecorationLine: 'underline',
		textDecorationColor: '#0074D9',
		textAlign: 'center' 
	},
	description: {
		paddingTop: 15,
	},
	descriptionText: {
		fontSize: 17.5,
		fontWeight: '900',
		textAlign: 'center',
	},
	time: {
		paddingTop: 15
	},
	timeText: {
		fontSize: 15,
		textAlign: 'center',
		paddingTop: 5
	},
	interests: {
		paddingTop: 25
	},
	innerInterests: {
		flexDirection: 'row',
	},
	interest: {
		flex: 1,
		margin: 5,
		paddingTop: 2.5,
		paddingBottom: 2.5,
		paddingLeft: 5,
		paddingRight: 5,
		borderStyle: 'solid',
		borderRadius: 5
	},
	filler: {
		flex: 1,
		margin: 5,
		paddingTop: 2.5,
		paddingBottom: 2.5,
		paddingLeft: 5,
		paddingRight: 5,
	},
	interestText: {
		fontSize: 13,
		fontWeight: '800',
		textAlign: 'center'
	}
});