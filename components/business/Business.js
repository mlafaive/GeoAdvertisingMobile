import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };


  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.name}</Text>
        </View>
    );
  }
}

Business.propTypes = {
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
}

export default Business;
