import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <View style={styles.container}>
          <Text>User Page</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0074D9',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
