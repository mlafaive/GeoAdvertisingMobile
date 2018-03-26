import React from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import openMap from 'react-native-open-maps';

import Offer from '../offer/Offer.js';
import OfferForm from '../offer_form/OfferForm.js';

import PropTypes from 'prop-types';

import styles from './Styles.js';

import { POST } from '../../fetch_wrapper/FetchWrapper.js';


class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      create: false,
      form_loading: false,
      form_error: '',
      offers: props.offers,
    };

    this.maps = () => {
      openMap({ latitude: this.props.latitude, longitude: this.props.longitude });
    }

    this.create = (state) => {
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

      if (state.start_time < new Date() || state.start_time > state.end_time){
        this.setState({
          form_error: 'must enter valid start and end times'
        });
        return;
      }
      state.start_time = state.start_time.toUTCString();
      state.end_time = state.end_time.toUTCString();
      // validate
      POST('/businesses/' + this.props.id + '/offers', state)
      .then((res) => {
        let offers = this.state.offers;
        offers.push(res);
        this.setState({
          form_loading: false,
          offers: offers,
          create: false
        });
      })
      .catch((err) => {
        console.log(err);
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

    this.toggle = () => {
      this.setState({
        create: !this.state.create,
        form_error: ''
      })
    }

    this.render_info = () => {
      return (
        <TouchableHighlight onPress={this.maps} underlayColor='#AAAAAA'>
          <View style={styles.info}>
            <Text style={styles.address}>
              {this.props.store_address}
            </Text>
            <Text style={styles.address}>
              {this.props.city.city_name + ", " + this.props.city.state_name}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }

    this.render_offers = () => {
      let items = [];
      for (let i = this.state.offers.length - 1; i >= 0; i--) {
        items.push(<Offer key={i} {...this.state.offers[i]}/>);
      }
      return items;
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      offers: nextProps.offers
    });
  }
  render() {
    return (
        <View style={styles.container}>
          { this.state.create && 
            <View style={styles.createScreen}>
              <OfferForm
                onSave={this.create} 
                loading={this.state.form_loading}
                error={this.state.form_error}
                onClose={this.toggle}
              />
            </View>
          }
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
            { this.render_info() }
            <View style={styles.offers}>
              <View style={styles.offerHeader}>
                <Icon
                  containerStyle={styles.create} 
                  iconStyle={styles.createIcon}
                  name='md-add-circle' 
                  type='ionicon' 
                  size={30}
                  onPress={this.toggle}
                />
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
