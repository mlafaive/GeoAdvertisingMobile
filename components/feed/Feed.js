import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import ReactRouterPropTypes from 'react-router-prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccessToken } from '../../actions/token.js';

import HeaderView from '../header_view/HeaderView.js';
import Offer from '../offer/Offer.js';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';

import styles from './Styles.js';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      offers: []
    };

    this.render_offers = () => {
      var items = [];
      for (var i = 0; i < this.state.offers.length; i++) {
        items.push(<Offer key={0} {...this.state.offers[i]}/>);
      }
      return items;
    }

    this.refresh_token = () => {
      POST('/refresh', this.props.token.refresh_token)
      .then((data) => {
        this.props.setAccessToken(data.access_token);
        this.get_offers(data.access_token);
      })
      .catch((err) => {
        console.warn(err);
      });
    }

    this.get_offers = (token) => {
      GET('/offers', token)
      .then((data) => {
        this.setState({
          offers: data.offers,
          loading: false
        });
      })
      .catch((err) => {
        if (err.status === 403) {
          this.refresh_token();
          return;
        }
        console.warn(err);
      });
    }

    this.get_offers(this.props.token.access_token);
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
    token: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAccessToken
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);