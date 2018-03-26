import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';

import DatePicker from 'react-native-datepicker';

import PropTypes from 'prop-types';

import { GET } from '../../fetch_wrapper/FetchWrapper.js';

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
    GET('/interests')
    .then((res) => {
      let new_interests = res.interests;
      
      for (var i = 0; i < new_interests.length; i++) {
        new_interests[i].checked = false;
      }
      this.setState({
        interests: new_interests,
        loading: false
      });
    })
    .catch((err) => {
      console.warn(err);
    });

    this.handle_check = (i) => {
      return () => {
        let current = this.state.interests;
        current[i].checked = !current[i].checked;
        this.setState({ interests: current});
      }
    }

    this.interests = () => {
      let items = [];
      for (var i = 0; i < this.state.interests.length; i += 2) {
        items.push(
          <View style={styles.individualInterestsRow} key={i}>
            { !(i + 1 < this.state.interests.length) && 
              <View style={styles.spacer}></View>
            }
            <CheckBox 
              containerStyle={styles.individualInterests}
              title={this.state.interests[i].name}
              checked={this.state.interests[i].checked}
              onPress={this.handle_check(i)}
            />
            { i + 1 < this.state.interests.length ?
              <CheckBox 
                containerStyle={styles.individualInterests}
                title={this.state.interests[i + 1].name}
                checked={this.state.interests[i + 1].checked}
                onPress={this.handle_check(i + 1)}
              />
              :
              <View style={styles.spacer}></View>
            }
          </View>
        );
      }
      return items;
    }

    this.submit = () => {
      let new_interests = [];
      for (var i = 0; i < this.state.interests.length; i++) {
        if (this.state.interests[i].checked) {
          new_interests.push(this.state.interests[i].id);
        }
      } 
      // example: 2016-01-04T10:34:23+01:00
      function getParsedDate(date){
        date = String(date).split(' ');
        var days = String(date[1]).split('/');
        var hours = String(date[2]);
        return [days[2], days[0], days[1], hours[0], hours[1]];
      }

      let start = null;
      if (this.state.start !== null) {
        start =  new Date(Date.UTC(...getParsedDate(this.state.start)));
      }
      let end = null;
      if (this.state.end !== null) {
        end =  new Date(Date.UTC(...getParsedDate(this.state.end)));
      }

      this.props.onSave({
        start_time: start,
        end_time: end,
        description: this.state.description,
        interests: new_interests
      });
    }
  }
  render() {
    return (
       <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>New Offer</Text>
            { !this.props.loading &&
              <Icon
                containerStyle={styles.close} 
                iconStyle={styles.icon}
                name='ios-close' 
                type='ionicon' 
                size={45}
                onPress={this.props.onClose}
              />
            }
          </View>
          <View style={styles.form}>
            <View key={0} style={styles.inputView}>
              <TextInput
                multiline
                style={styles.input}
                textAlign='left'
                placeholder="Short description of offer..."
                value={this.state.description}
                onChangeText={(input) => this.setState({description: input})}
              />
            </View>
            <View style={styles.dateView}>
              <DatePicker
                style={styles.date}
                date={this.state.start}
                minDate={new Date()}
                maxDate={this.state.end}
                placeholder="Start Time"
                mode="datetime"
                format="ddd MM/DD/YYYY hh:mm A"
                confirmBtnText="Select"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({start: date})}}
              />
              <DatePicker
                style={styles.date}
                date={this.state.end}
                minDate={this.state.start}
                placeholder="End Time"
                mode="datetime"
                format="ddd MM/DD/YYYY hh:mm A"
                confirmBtnText="Select"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({end: date})}}
              />
            </View>
            <View style={styles.interestsHeader} >
              <Text style={styles.interestsHeaderText}>Tags</Text>
            </View>
            { this.interests() }
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
                disabled={this.props.loading}
                disabledStyle={styles.disabled}
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
