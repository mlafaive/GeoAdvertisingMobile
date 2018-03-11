import { StyleSheet } from 'react-native';

import Dimensions from 'Dimensions';

var screenSize = Dimensions.get('window').width
var menuWidth = (screenSize*2)/3;

export default styles = StyleSheet.create({
	hidden: {
	  	display: 'none'
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	menu: {
		backgroundColor: '#001f3f',
		alignItems: 'center',
		paddingTop: 20,
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: menuWidth,
		opacity: 0.75
	},
	buttonView: {
		width: menuWidth - 10,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 15,
	},
	button: {
		padding: 15
	},
	menuText: {
		color: '#FFFFFF',
		fontWeight: '900',
	},
	overlay: {
		backgroundColor: '#7FDBFF',
		flex: 1,
		opacity: 0.75
	}
});