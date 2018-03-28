import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import HeaderView from '../header_view/HeaderView.js';

import { connect } from 'react-redux';

import { GET } from '../../fetch_wrapper/FetchWrapper.js';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class OfferFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      loading: true,
      offer: {}
    };

    GET('/offers/' + props.match.params.id)
    .then((data) => {
      this.setState({
        offer: data,
        loading: false,
        editable: data.isOwner
      });
    })
    .catch((err) => {
      console.warn(err);
    });

    this.close = () => {
      this.props.history.goBack();
    }

    this.interests = () => {
      let interests = "";
      for (var i = 0; i < this.state.offer.interests.length; i++) {
        interests += this.state.offer.interests[i].name;
        if (i + 1 < this.state.offer.interests.length) {
          interests += ", "
        }
      }
      return interests;
    }

    this.business = () => {
      this.props.history.push('/businesses/' + this.state.offer.business.id);
    }
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Offer</Text>
            <Icon
              containerStyle={styles.close} 
              iconStyle={styles.icon}
              name='md-arrow-back' 
              type='ionicon' 
              size={30}
              onPress={this.close}
            />
          </View>
          { this.state.loading ? 
            <View style={styles.loader}>
              <ActivityIndicator size='large' color="#001f3f" />
            </View>
            :
            <View style={styles.body}>
              <Text>Description: { this.state.offer.description }</Text>
              <Text>Start: { this.state.offer.start_time }</Text>
              <Text>End: { this.state.offer.end_time }</Text>
              <Text>Start: { this.state.offer.start_time }</Text>
              <Text>Interests: { this.interests() }</Text>
              <Text>Am I the owner? { this.state.offer.isOwner ? "Yes" : "No" }</Text>
              <Text 
                onPress={this.business}
                style={styles.link}
              >
                Business: { this.state.offer.business.name }
              </Text>
            </View>
          }
        </HeaderView>
    );
  }
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
  };
}

export default connect(mapStateToProps)(OfferFull);