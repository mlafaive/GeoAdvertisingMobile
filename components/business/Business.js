import React from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import Offer from '../offer/Offer.js';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.render_info = () => {
      return <Text></Text>;
    }

    this.render_offers = () => {
      let items = [];
      for (let i = this.props.offers.length - 1; i >= 0; i--) {
        items.push(<Offer key={i} {...this.props.offers[i]}/>);
      }
      return items;
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.props.name}</Text>
            { this.props.hasOwnProperty('close') &&
              <Icon
                containerStyle={styles.close} 
                iconStyle={styles.icon}
                name='md-arrow-back' 
                type='ionicon' 
                size={30}
                onPress={this.props.close}
              />
            }
          </View>
          <View style={styles.body}>
            <View style={styles.info}>
              { this.render_info() }
            </View>
            <View style={styles.offers}>
              <View style={styles.offerHeader}>
                <Text style={styles.offerHeaderText}>Offers</Text>
              </View>
              <ScrollView>
                { this.render_offers() }
              </ScrollView>
            </View>
          </View>
        </View>
    );
  }
}

Business.propTypes = {
  close: PropTypes.func,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  store_address: PropTypes.string.isRequired,
  city: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city_name: PropTypes.string.isRequired,
    state_name: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired
  })).isRequired,
};

export default Business;
