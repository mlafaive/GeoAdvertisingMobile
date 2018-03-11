import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeRouter as Router, Route, Switch } from 'react-router-native';

import Login from './components/login/Login.js';
import Feed from './components/feed/Feed.js';
import Settings from './components/settings/Settings.js';
import Businesses from './components/businesses/Businesses.js';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={(props) => <Login {...props}/>}/>
          <Route exact path="/offers" component={(props) => <Feed {...props}/>}/>
          <Route exact path="/settings" component={(props) => <Settings {...props}/>}/>
          <Route exact path="/businesses" component={(props) => <Businesses {...props}/>}/>
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
  },
});
