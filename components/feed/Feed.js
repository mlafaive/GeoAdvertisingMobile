import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import { getLocation } from '../../permissions/Permissions.js';

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
      for (var i = 0; i < this.state.offers.length; i++) {
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
      let url = '/offers';
      getLocation()
      .then((loc) => {
        url += "?latitude=" + loc.coords.latitude + "&longitude=" + loc.coords.longitude;
        GET(url)
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
      })
      .catch(() => {
        alert('To see offers near you please enable location services')
        GET(url)
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
