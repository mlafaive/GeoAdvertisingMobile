import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
	    backgroundColor: '#DDDDDD',
	    padding: 10,
	 },
	 form: {
	 	backgroundColor: '#FFFFFF',
	 	borderRadius: 10,
	  	borderWidth: 0.5,
	  	borderColor: '#d6d7da',
	  	paddingLeft: 10,
	  	paddingRight: 10
	 },
	 label: {
	 	padding: 10,
	 	color: '#111111',
	 	fontSize: 15,
	 	fontWeight: '900',
	 	flex: 1,
	 },
	 inputView: {
	 	paddingTop: 10,
	 	flexDirection: 'row',
	 	alignItems: 'baseline'
	 },
	 input: {
		backgroundColor: '#FFFFFF',
	  	height: 20,
	  	fontSize: 12.5,
	  	borderRadius: 10,
	  	borderWidth: 0.5,
	  	borderColor: '#d6d7da',
	  	flex: 4,
	  	paddingLeft: 5
	 }
});