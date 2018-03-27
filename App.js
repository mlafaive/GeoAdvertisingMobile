import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeRouter as Router, Route, Switch } from 'react-router-native';

import Login from './components/login/Login.js';
import Feed from './components/feed/Feed.js';
import Settings from './components/settings/Settings.js';
import Businesses from './components/businesses/Businesses.js';
import Business from './components/business/Business.js';
import OfferFull from './components/offer_full/OfferFull.js';

import { Provider } from 'react-redux';
import store from './store/Store.js';

 // this.props.history.goBack();
 // this.props.history.push('/route');

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={(props) => <Login {...props}/>}/>
            <Route exact path="/offers" component={(props) => <Feed {...props}/>}/>
            <Route exact path="/offers/:id" component={(props) => <OfferFull {...props}/>}/>
            <Route exact path="/settings" component={(props) => <Settings {...props}/>}/>
            <Route exact path="/businesses" component={(props) => <Businesses {...props}/>}/>
            <Route exact path="/businesses/:id" component={(props) => <Business {...props}/>}/>
          </Switch>
          </View>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0074D9',
  },
});
