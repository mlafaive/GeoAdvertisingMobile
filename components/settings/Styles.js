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
	loader: {
	 	flex: 1,
	 	justifyContent: 'center',
	},
	passLoader: {
		backgroundColor: '#111111',
	},
	settings: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 25,
		paddingBottom: 10,
		flex: 3
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
    	alignItems: 'center',
	},
	rows: {
    	fontSize: 18,
    	flex:1.2,
	},
	button: {
		backgroundColor: '#2ECC40',
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
	  	flex: 3,
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
	passwordButtonStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	buttonPass: {
		backgroundColor: '#faebd7',
    	borderRadius: 5,
    	height: 30,
    	flex: 1
	},
	individualInterestsRow: {
		flexDirection: 'row',
		paddingLeft: 10,
		justifyContent: 'center',
	},
	individualInterests: {
		width: 150
	},
	error: {
		color: '#85144b',
    	fontSize: 12,
    	fontWeight: '900',
    	fontStyle: 'italic'
	},
	errorView: {
		alignItems: 'center'
	},
	avoidKeyboard: {
		backgroundColor: '#FFFFFF'
	}
});