import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import ReactRouterPropTypes from 'react-router-prop-types';

import HeaderView from '../header_view/HeaderView.js';
import Offer from '../offer/Offer.js';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';

import styles from './Styles.js';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      offers: []
    };

    this.render_offers = () => {
      var items = [];
      for (var i = this.state.offers.length - 1; i >= 0; i--) {
        items.push(
          <Offer 
            key={i} 
            {...this.state.offers[i]} 
            history={this.props.history}
          />
        );
      }
      return items;
    }

    this.get = () => {
      GET('/offers')
      .then((data) => {
        this.setState({
          loading: false,
          offers: data.offers,
          refreshing: false
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    }
    this.get();

    this.refresh = () => {
      this.setState({
        refreshing: true
      });
      this.get();
    }
    
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          { this.state.loading ?
            <View style={styles.loader}>
              <ActivityIndicator size='large' color="#001f3f" />
            </View>
            :
            <ScrollView 
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refresh}
                />
              }
            >
              { this.render_offers() }
            </ScrollView>
          }
        </HeaderView>
    );
  }
}

Feed.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default Feed;
