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
	},
	settingsRow: {
		height: 35
	},
	blank: {
		flex: 1,
	},
	rowsView: {
    	paddingLeft: 15,
    	height: 35,
    	flexDirection: 'row',
    	alignItems: 'baseline',
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
	inputEmail: {
		paddingLeft: 10,
		fontSize: 17,
		flex:3,
	},
	inputBox: {
  	backgroundColor: '#FFFFFF',
  	height: 24,
  	fontSize: 17,
  	borderRadius: 10,
  	borderWidth: 0.5,
  	borderColor: '#d6d7da',
  	flex: 2,
  	paddingLeft: 5
	},
	passwordBox: {
		padding: 10,
	},
	passwordInputBox: {
		backgroundColor: '#FFFFFF',
  	height: 25,
    color: '#111111',
  	borderRadius: 10,
  	borderWidth: 0.5,
  	borderColor: '#d6d7da',
  	paddingLeft: 5,
	},
	passwordRowsView: {
		paddingTop: 10,
		paddingLeft: 15,
  	paddingRight: 15,
	},
	passwordsSpacing: {
		padding: 5,
	},
	individualInterestsRow: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	individualInterests: {
		flex: 1,
	},
});