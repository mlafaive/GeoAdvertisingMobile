import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './components/Login.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0074D9',
    justifyContent: 'center',
  },
});
