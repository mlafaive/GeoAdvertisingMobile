import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class BusinessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      store_address: props.store_address,
      city: props.city.city_name,
      state: props.city.state_name
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
            onChangeText={(input) => this.setState({[field]: input})}
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

    this.submit = () => {
      this.props.onSave({
        name: this.state.name,
        store_address: this.state.store_address,
        city_name: this.state.city,
        state_name: this.state.state
      });
    }


  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.form}>
            { this.render_inputs() }
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{this.props.error}</Text>
            </View>
            <View style={styles.submitView}>
              <Button
                raised
                borderRadius={5}
                containerViewStyle={styles.submitCont}
                loading={this.props.loading}
                buttonStyle={styles.submit}
                textStyle={styles.submitText}
                title={this.props.loading ? "" : "Save"}
                onPress={this.submit}
              />
            </View>
          </View>
        </View>
    );
  }
}

BusinessForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  store_address: PropTypes.string,
  city: PropTypes.shape({
    city_name: PropTypes.string,
    state_name: PropTypes.string,
  }),
}

BusinessForm.defaultProps = {
  loading: false,
  error: '',
  name: '',
  store_address: '',
  city: {
    city_name: '',
    state_name: '',
  },
}

export default BusinessForm;
