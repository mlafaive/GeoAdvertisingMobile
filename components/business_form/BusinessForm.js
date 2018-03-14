import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class BusinessForm extends React.Component {
  constructor(props) {
    super(props);
    if (!props.create && !props.hasOwnProperty('id')) {
      console.warn('Must pass prop \'id\' when editing existing business');
    }
    this.state = {
      name: props.name,
      store_address: props.store_address,
      city: props.city.city_name,
      state: props.city.state_name,
      error: ''
    };

    this.create_input = (i, label, field) => {
      return (
        <View key={i} style={styles.inputView}>
          <Text style={styles.label}>{label + ':'}</Text>
          <TextInput
            style={styles.input}
            textAlign='left'
            autoCapitalize='none'
            autoCorrect={false}
            value={this.state[field]}
            onChangeText={(input) => this.setState({[field]: input, error: ''})}
          />
        </View>
      );
    }

    this.render_inputs = () => {
      var items = [];

      items.push(this.create_input(0, 'Name', 'name'));
      items.push(this.create_input(1, 'Address', 'store_address'));
      items.push(this.create_input(2, 'City', 'city'));
      items.push(this.create_input(3, 'State', 'state'));

      return items;
    }


  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.form}>
            { this.render_inputs() }
          </View>
        </View>
    );
  }
}

BusinessForm.propTypes = {
  create: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  store_address: PropTypes.string,
  city: PropTypes.shape({
    city_name: PropTypes.string,
    state_name: PropTypes.string,
  }),
}

BusinessForm.defaultProps = {
  create: false,
  name: '',
  store_address: '',
  city: {
    city_name: '',
    state_name: '',
  },
}

export default BusinessForm;
