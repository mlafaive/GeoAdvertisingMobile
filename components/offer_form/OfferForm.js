import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import DatePicker from 'react-native-datepicker';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class OfferForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      interests: [], // once luis finishes checkboxes, 
                     // copy into component and use for this
      start: null,
      end: null,
      loading: true
    };
    this.submit = () => {
      this.props.onSave({
        start_time: this.state.start,
        end_time: this.state.end,
        description: this.state.description,
        interests: this.state.interests
      });
    }
  }
  render() {
    return (
       <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>New Offer</Text>
              <Icon
                containerStyle={styles.close} 
                iconStyle={styles.icon}
                name='ios-close' 
                type='ionicon' 
                size={45}
                onPress={this.props.onClose}
              />
          </View>
          <View style={styles.form}>
            <View key={0} style={styles.inputView}>
              <TextInput
                multiline
                style={styles.input}
                textAlign='left'
                autoCapitalize='none'
                autoCorrect={false}
                placeholder="Short description of offer..."
                value={this.state.description}
                onChangeText={(input) => this.setState({description: input})}
              />
            </View>
            <View style={styles.dateView}>
              <DatePicker
                style={styles.date}
                date={this.state.start}
                placeholder="Start Time"
                mode="datetime"
                format="YYYY-MM-DD"
                confirmBtnText="Select"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({start: date})}}
              />
              <DatePicker
                style={styles.date}
                date={this.state.end}
                placeholder="End Time"
                mode="datetime"
                format="YYYY-MM-DD"
                confirmBtnText="Select"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({end: date})}}
              />
            </View>
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

OfferForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

export default OfferForm;
