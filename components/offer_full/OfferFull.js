import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';

import HeaderView from '../header_view/HeaderView.js';
import OfferForm from '../offer_form/OfferForm.js';

import { colors } from '../../Constants.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setOffer } from '../../actions/businesses.js';

import { GET, PATCH } from '../../fetch_wrapper/FetchWrapper.js';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class OfferFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      loading: true,
      form_loading: false,
      form_error: '',
      offer: {}
    };
    this.get = (id) => {
      GET('/offers/' + id)
      .then((data) => {
        this.setState({
          offer: data,
          loading: false,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    }
    this.get(props.match.params.id);

    this.close = () => {
      this.props.history.goBack();
    }

    this.render_interests = () => {
      let interests = [];
      for (var i = 0; i < this.state.offer.interests.length; i += 2) {
        let index = this.state.offer.interests[i].id % colors.length;
        let style_obj = {
          color1: {
            backgroundColor: colors[index],
            borderColor: colors[index],
          },
        };

        let second = i + 1 < this.state.offer.interests.length;
        if (second) {
          index = this.state.offer.interests[i + 1].id % colors.length;
          style_obj.color2 = {
            backgroundColor: colors[index],
            borderColor: colors[index]
          }
        }

        let style =  StyleSheet.create(style_obj);
        interests.push(
          <View key={i} style={styles.innerInterests}>
            <View style={[style.color1, styles.interest]}>
              <Text style={styles.interestText}>{ this.state.offer.interests[i].name }</Text>
            </View>
            {
              second 
              ?
              <View key={i} style={[style.color2, styles.interest]}>
                <Text style={styles.interestText}>{ this.state.offer.interests[i + 1].name }</Text>
              </View>
              :
              <View style={styles.filler}/>
            }
          </View>
        );
      }
      return (
        <View style={styles.interests}>{ interests }</View>
      );
    }

    this.business = () => {
      this.props.history.push('/businesses/' + this.state.offer.business.id);
    }

    this.toggle = () => {
      this.setState({
        editing: !this.state.editing
      });
    }

    this.save = (state) => {
      if (state.description.length === 0){
        this.setState({
          form_error: 'must enter a description'
        });
        return;
      } 
      if (state.start_time === null || state.end_time === null){
        this.setState({
          form_error: 'must enter start and end time'
        });
        return;
      }

      state.start_time = moment(state.start_time, 'ddd MM/DD/YYYY hh:mm A').format();
      state.end_time = moment(state.end_time, 'ddd MM/DD/YYYY hh:mm A').format();
      // validate
      PATCH('/offers/' + this.props.match.params.id, state)
      .then((res) => {
        this.props.setOffer(this.state.offer.business.id, res);
        this.setState({
          offer: res,
          form_loading: false,
          editing: false
        });
      })
      .catch((err) => {
        console.warn(err);
        err.json().then((data) => {
          this.setState({form_error: data.error, form_loading: false})
        })
        .catch((json_err) => {
          console.warn("could not parse as json");
          console.warn(err);
          console.warn(json_err)
        });
      });

      this.setState({
        form_loading: true,
        form_error: ''
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        loading: true
      });
      this.get(nextProps.match.params.id);
    }
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          { this.state.editing && 
            <View style={styles.createScreen}>
              <OfferForm
                onSave={this.save} 
                loading={this.state.form_loading}
                error={this.state.form_error}
                onClose={this.toggle}
                offer={{
                  description: this.state.offer.description,
                  interests: this.state.offer.interests,
                  start_time: moment(this.state.offer.start_time).format('ddd MM/DD/YYYY hh:mm A'),
                  end_time: moment(this.state.offer.end_time).format('ddd MM/DD/YYYY hh:mm A')
                }}
              />
            </View>
          }
          <View style={styles.header}>
            <Text style={styles.headerText}>Offer</Text>
            { !this.state.loading &&
              <Icon
                containerStyle={styles.close} 
                iconStyle={styles.icon}
                name='md-arrow-back' 
                type='ionicon' 
                size={30}
                onPress={this.close}
              />
            }
            { !this.state.loading && this.state.offer.isOwner &&
              <Icon
                containerStyle={styles.edit} 
                iconStyle={styles.icon}
                name='edit' 
                type='feather' 
                onPress={this.toggle}
              />
            }
          </View>
          { this.state.loading ? 
            <View style={styles.loader}>
              <ActivityIndicator size='large' color="#001f3f" />
            </View>
            :
            <View style={styles.body}>
              <View style={styles.business}>
                <Text style={styles.businessText} onPress={this.business}>
                  { this.state.offer.business.name }
                </Text>
              </View>
              <View style={styles.description}>
                <Text style={styles.descriptionText}>{ this.state.offer.description }</Text>
              </View>
              <View style={styles.time}>
                <Text style={styles.timeText}>
                  Starts: { moment(this.state.offer.start_time).format('ddd MM/DD/YYYY h:mm A') }
                </Text> 
                <Text style={styles.timeText}> 
                  Ends: { moment(this.state.offer.end_time).format('ddd MM/DD/YYYY h:mm A') }
                </Text>
              </View>
              { this.render_interests() }
            </View>
          }
        </HeaderView>
    );
  }
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setOffer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferFull);