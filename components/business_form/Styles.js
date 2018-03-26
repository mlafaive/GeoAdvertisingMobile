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
	  	paddingRight: 10,
	  	shadowOffset: { width: 0, height: .5 },
    	shadowOpacity: 0.5,
    	shadowRadius: 10,
	 },
	 label: {
	 	color: '#111111',
	 	fontSize: 20,
	 	flex: 1,
	 },
	 inputView: {
	 	paddingTop: 10,
	 	flexDirection: 'row',
	 	alignItems: 'baseline'
	 },
	 input: {
		backgroundColor: '#FFFFFF',
	  	height: 25,
	  	fontSize: 12.5,
	  	borderRadius: 10,
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