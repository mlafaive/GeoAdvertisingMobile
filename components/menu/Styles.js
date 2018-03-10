import { StyleSheet } from 'react-native';

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
		backgroundColor: '#7FDBFF',
		alignItems: 'center',
		paddingTop: 20,
		overflow: 'hidden'
	},
	menuText: {
		color: '#001f3f'
	},
	overlay: {
		backgroundColor: '#7FDBFF',
		flex: 1,
		opacity: 0.75
	}
});