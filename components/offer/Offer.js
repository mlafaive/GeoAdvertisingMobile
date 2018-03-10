import React from 'react';
import { Text, View } from 'react-native';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>{ this.props.description }</Text>
        </View>
    );
  }
}

Offer.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Offer;