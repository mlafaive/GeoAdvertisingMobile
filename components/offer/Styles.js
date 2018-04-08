import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
	    borderStyle: 'solid',
	    borderColor: '#001f3f',
	    borderBottomWidth: 1,
	    borderBottomLeftRadius: 10,
	    borderBottomRightRadius: 10,
	    padding: 15,
	},
	text: {
		fontSize: 12.5,
		color: '#001f3f',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerText: {
		fontSize: 15,
		color: '#111111',
		fontWeight: '900'
	},
	name: {
		flex: 3,
	},
	distance: {
		flex: 1,
		alignItems: 'flex-end'
	},
	description: {
		paddingTop: 5
	},
	interests: {
		paddingTop: 5
	},
	innerInterests: {
		flexDirection: 'row',
	},
	interest: {
		flex: 1,
		margin: 5,
		paddingTop: 2.5,
		paddingBottom: 2.5,
		paddingLeft: 5,
		paddingRight: 5,
		borderStyle: 'solid',
		borderRadius: 5
	},
	filler: {
		flex: 1,
		margin: 5,
		paddingTop: 2.5,
		paddingBottom: 2.5,
		paddingLeft: 5,
		paddingRight: 5,
	},
	interestText: {
		fontSize: 13,
		fontWeight: '800',
		textAlign: 'center'
	}
});