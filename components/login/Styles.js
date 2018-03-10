import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  icon: {
    backgroundColor: '#001f3f'
  },
  iconView: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputView: {
    paddingTop: 10,
    paddingRight: 25,
    paddingLeft: 25,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 35,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  submitView: {
    paddingTop: 15,
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
  createView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
  },
  createText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 35
  },
  createButton: {
    backgroundColor: '#001f3f',
    padding: 7.5,
    borderRadius: 15,
  },
  createButtonText: {
    color: '#FFFFFF'
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  footerText: {
    fontSize: 7.5
  },
  errorView: {
    paddingTop: 10,
    height: 30,
    alignItems: 'center'
  },
  errorText: {
    color: '#85144b',
    fontSize: 15,
    fontWeight: '900',
    fontStyle: 'italic'
  }
});