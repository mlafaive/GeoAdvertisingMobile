import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import ReactRouterPropTypes from 'react-router-prop-types';

import HeaderView from '../header_view/HeaderView.js';
import Offer from '../offer/Offer.js';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setOffers } from '../../actions/businesses.js';

import styles from './Styles.js';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    this.render_offers = () => {
      var items = [];
      for (var i = this.props.businesses.offers.length - 1; i >= 0; i--) {
        items.push(<Offer key={i} {...this.props.businesses.offers[i]}/>);
      }
      return items;
    }

    if (props.businesses === null || !props.businesses.hasOwnProperty('offers')) {
      GET('/offers')
      .then((data) => {
        this.props.setOffers(data.offers);
        this.setState({
          loading: false
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    }
    else {
      this.state.loading = false;
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
            <ScrollView>
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

function mapStateToProps(state) {
  return {
    businesses: state.businesses
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setOffers
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
