import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import HeaderView from '../header_view/HeaderView.js';
import Business from '../business/Business.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccessToken } from '../../actions/token.js';
import { setEmail } from '../../actions/email.js';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';

import styles from './Styles.js';

class Businesses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      businesses: []
    };

    this.render_businesses = () => {
      var items = [];
      for (var i = 0; i < this.state.businesses.length; i++) {
        items.push(<Business key={0} {...this.state.businesses[i]}/>);
      }
      return items;
    }

    this.refresh_token = () => {
      GET('/refresh', this.props.token.refresh_token)
      .then((data) => {
        this.props.setAccessToken(data.access_token);
        this.get_businesses(data.access_token);
      })
      .catch((err) => {
        console.warn(err);
      });
    }

    this.get_businesses = (token) => {
      let url = '/users/' + this.props.email + '/businesses';
      GET(url, token)
      .then((data) => {
        this.setState({
          businesses: data.businesses,
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

    this.get_businesses(this.props.token.access_token);
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
            { this.render_businesses() }
          </ScrollView>
        }
        </HeaderView>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    email: state.email
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAccessToken,
    setEmail
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
