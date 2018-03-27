import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import ReactRouterPropTypes from 'react-router-prop-types';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.open = () => {
      this.props.history.push('/offers/' + this.props.id);
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.open} underlayColor='#AAAAAA'>
        <View style={styles.container}>
          <Text style={styles.text}>{ this.props.description }</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Offer.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

export default Offer;