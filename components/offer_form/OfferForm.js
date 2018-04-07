import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setInterests } from '../../actions/interests.js';

import DatePicker from 'react-native-datepicker';

import PropTypes from 'prop-types';

import { GET } from '../../fetch_wrapper/FetchWrapper.js';

import styles from './Styles.js';

class OfferForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      start: null,
      end: null,
      loading: true,
      interests: []
    };
    if (this.props.interests === null) {
      GET('/interests')
      .then((res) => {
        this.props.setInterests(res.interests);
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
    }
    else {
      this.state.loading = false;
      let new_interests = this.props.interests;
      
      for (var i = 0; i < new_interests.length; i++) {
        new_interests[i].checked = false;
      }
      this.state.interests = new_interests;
    }

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

      this.props.onSave({
        start_time: this.state.start,
        end_time: this.state.end,
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

function mapStateToProps(state) {
  return {
    interests: state.interests
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setInterests
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);