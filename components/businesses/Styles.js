import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#DDDDDD'
	},
	loader: {
		flex: 1,
		justifyContent: 'center'
	},
	content: {
		flex: 1
	},
	submitText: {
		color: '#FFFFFF'
	},
	cancelText: {
		color: '#111111'
	},
	buttonCont: {
		borderRadius: 5,
	},
	submit: {
		backgroundColor: '#79C753', 
		borderRadius: 5,
		height: 30
	},
	cancel: {
		backgroundColor: '#DDDDDD', 
		borderRadius: 5,
		height: 30
	},
	headerView: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 15,
		paddingBottom: 25
	},
	cancelView: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingTop: 15,
		paddingBottom: 5
	},
	headerViewCreate: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 15,
		paddingBottom: 25
	},
	business: {
		borderStyle: 'solid',
	    borderColor: '#001f3f',
	    borderBottomWidth: 1,
	    borderBottomLeftRadius: 10,
	    borderBottomRightRadius: 10,
	},
	businessText: {
		fontSize: 12.5,
		color: '#001f3f'
	},
	businessOpen: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingTop: 15,
	    paddingBottom: 15,
	},
	fullBusiness: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 100
	}
});