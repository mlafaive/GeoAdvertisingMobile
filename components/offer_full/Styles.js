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
	link: {
		color: '#0074D9',
		textDecorationLine: 'underline',
		textDecorationColor: '#0074D9' 
	}
});