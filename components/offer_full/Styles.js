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
	fullScreen: {
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
	deleteIcon: {
		height: 40,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		padding: 10
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
		paddingTop: 5,
	},
	descriptionText: {
		fontSize: 17.5,
		fontWeight: '900',
		textAlign: 'center',
	},
	time: {
		paddingTop: 5
	},
	timeText: {
		fontSize: 15,
		textAlign: 'center',
		paddingTop: 5
	},
	interests: {
		paddingTop: 15
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
	},
	underlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.5,
		backgroundColor: '#111111',
	},
	overlay: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modal: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderColor: '#111111',
		borderWidth: 1,
		borderStyle: 'solid',
	},
	modalText: {
		fontSize: 25,
		fontWeight: 'bold',
		padding: 25,
	},
	buttons: {
		flexDirection: 'row',
	},
	cancel: {
		flex: 1,
		borderColor: '#111111',
		borderTopWidth: 1,
		borderBottomWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 1,
		borderStyle: 'solid',
		borderBottomLeftRadius: 10,
	},
	cancelTouch: {
		borderBottomLeftRadius: 10,
	},
	delete: {
		flex: 1,
		borderTopWidth: 1,
		borderBottomWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderColor: '#111111',
		borderStyle: 'solid',
		borderBottomRightRadius: 10,
	},
	deleteTouch: {
		borderBottomRightRadius: 10,
	},
	modalButtonText: {
		padding: 10,
		fontSize: 20,
		textAlign: 'center'
	},
	accept: {
		flex: 1,
		margin: 10,
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#111111',
		borderWidth: 3,
		borderStyle: 'dashed',
	},
	acceptCont: {
		borderRadius: 5,
	},
	acceptButton: { 
		borderRadius: 5,
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 10,
		paddingLeft: 10,
		backgroundColor: '#79C753',
	},
	acceptText: {
		fontSize: 20,
		color: '#001f3f'
	},
	acceptedText: {
		fontSize: 17.5,
		fontWeight: '900',
		textAlign: 'center',
		color: '#0074D9'
	}
});