import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	screen: {
		paddingTop: 10,
		backgroundColor: '#ffffff',
		flex: 1,
	},
	settings: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 25,
		paddingBottom: 10,
		flex: 2
	},
	settingsRow: {
		flexDirection: 'row',
		height: 35
	},
	blank: {
		flex: 1,
	},
	rowsView: {
    	paddingLeft: 15,
    	paddingRight: 15,
    	height: 35,
    	flexDirection: 'row',
	},
	rows: {
    	fontSize: 18,
    	flex:1,
	},
	button: {
		backgroundColor: '#faebd7', 
    	borderRadius: 5,
    	height: 30,
    	flex: 1
	},
	buttonText: {
		color: '#000000',
	},
	inputText: {
		paddingLeft: 10,
		fontSize: 17,
		flex:2
	},
	inputBox: {
    	backgroundColor: '#FFFFFF',
    	height: 24,
    	fontSize: 17,
    	borderRadius: 10,
    	borderWidth: 0.5,
    	borderColor: '#d6d7da',
    	flex: 2,
    	paddingLeft: 10
  	},
});