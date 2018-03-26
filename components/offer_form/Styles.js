import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#FFFFFF',
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
		right: 0,
		paddingTop: 17.5,
		paddingRight: 12.5
	},
	headerText: {
		fontSize: 20,
		color: '#FFFFFF',
		fontWeight: '900'
	},
	form: {
	  	paddingLeft: 10,
	  	paddingRight: 10,
	 },
	 label: {
	 	color: '#111111',
	 	fontSize: 15
	 },
	 dateView: {
	 	alignItems: 'center'
	 },
	 date: {
	 	paddingTop: 15,
	 	width: 250,
	 },
	 inputView: {
	 	paddingTop: 10,
	 	flexDirection: 'row',
	 	alignItems: 'baseline'
	 },
	 input: {
		backgroundColor: '#FFFFFF',
	  	height: 75,
	  	fontSize: 15,
	  	borderWidth: 0.5,
	  	borderColor: '#d6d7da',
	  	flex: 2,
	  	paddingLeft: 5
	 },
	 submitView: {
	    paddingBottom: 10,
	    paddingRight: 80,
	    paddingLeft: 80,
	  },
	  submitCont: {
	    borderRadius: 5,
	  },
	  submit: {
	    backgroundColor: '#79C753', 
	    borderRadius: 5,
	    height: 30
	  },
	  submitText: {
	    textAlign: 'center',
	    fontSize: 17.5,
	    color: '#001f3f'
	  },
	  errorView: {
	    paddingTop: 10,
	    height: 30,
	    alignItems: 'center'
	  },
	  errorText: {
	    color: '#85144b',
	    fontSize: 10,
	    fontWeight: '900',
	    fontStyle: 'italic'
	  }
});