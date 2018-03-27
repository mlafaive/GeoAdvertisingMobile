import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class OfferFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      loading: true,
      offer: {
        name: 'Example'
      }
    };

    this.close = () => {
      this.props.history.goBack();
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.state.offer.name}</Text>
            <Icon
              containerStyle={styles.close} 
              iconStyle={styles.icon}
              name='md-arrow-back' 
              type='ionicon' 
              size={30}
              onPress={this.close}
            />
          </View>
          <View style={styles.body}>
            <Text>This is an offer</Text>
          </View>
        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
  };
}

export default connect(mapStateToProps)(OfferFull);