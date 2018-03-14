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
		justifyContent: 'flex-end',
		paddingTop: 15,
		paddingBottom: 25
	},
	headerViewCreate: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 15,
		paddingBottom: 25
	}
});