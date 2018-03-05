import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeRouter as Router, Route, Switch } from 'react-router-native';

import Login from './components/Login.js';
import User from './components/User.js';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={(props) => <Login {...props}/>}/>
          <Route exact path="/user" component={(props) => <User {...props}/>}/>
        </Switch>
        </View>
      </Router>
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
