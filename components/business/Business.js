import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import openMap from 'react-native-open-maps';

import moment from 'moment';

import HeaderView from '../header_view/HeaderView.js';

import Offer from '../offer/Offer.js';
import OfferForm from '../offer_form/OfferForm.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setBusinesses, addOffer } from '../../actions/businesses.js';

import PropTypes from 'prop-types';

import styles from './Styles.js';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';


class Business extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      form_loading: false,
      form_error: '',
      business: {},
      editable: false,
      loading: true
    };

    this.get_info = (_props, rerender = true) => {
      if (_props.businesses === null 
          || !_props.businesses.businesses.hasOwnProperty(_props.match.params.id)) {
        
        GET('/businesses/' + _props.match.params.id)
        .then((data) => {
          this.setState({
            business: data,
            loading: false,
            editable: data.isOwner
          });
        })
        .catch((err) => {
          console.warn(err);
        });
        if (rerender) {
          this.setState({
            loading: true
          });
        }
      }
      else if (rerender) {
        this.setState({
          business: _props.businesses.businesses[_props.match.params.id],
          loading: false,
          editable: true
        })
      }
      else {
        this.state.business = _props.businesses.businesses[_props.match.params.id];
        this.state.loading = false;
        this.state.editable = true;
      }
    }
    this.get_info(props, false);


    this.maps = () => {
      openMap({ latitude: this.state.business.latitude, longitude: this.state.business.longitude });
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

      state.start_time = moment(state.start_time, 'ddd MM/DD/YYYY hh:mm A').format();
      state.end_time = moment(state.end_time, 'ddd MM/DD/YYYY hh:mm A').format();
      // validate
      POST('/businesses/' + this.props.match.params.id + '/offers', state)
      .then((res) => {
        this.props.addOffer(this.props.match.params.id, res);
        this.setState({
          form_loading: false,
          create: false
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

    this.close = () => {
      this.props.history.goBack();
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
              {this.state.business.store_address}
            </Text>
            <Text style={styles.address}>
              {this.state.business.city.city_name + ", " + this.state.business.city.state_name}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }

    this.render_offers = () => {
      let items = [];
      for (let i = this.state.business.offers.length - 1; i >= 0; i--) {
        items.push(
          <Offer 
            key={i} 
            id={this.state.business.offers[i].id}
            description={this.state.business.offers[i].description}
            interests={this.state.business.offers[i].interests} 
            history={this.props.history}
          />
        );
      }
      return items;
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.get_info(nextProps);
    }
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
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
            <Text style={styles.headerText}>
              {
                this.state.business.hasOwnProperty('name') && this.state.business.name.length > 20 
                ? 
                this.state.business.name.slice(0, 17) + "..." 
                : 
                this.state.business.name
              }
            </Text>
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
          </View>
          { this.state.loading ? 
            <View style={styles.loader}>
              <ActivityIndicator size='large' color="#001f3f" />
            </View>
            :
            <View style={styles.body}>
              { this.render_info() }
              <View style={styles.offers}>
                <View style={styles.offerHeader}>
                  { this.state.editable && 
                    <Icon
                      containerStyle={styles.create} 
                      iconStyle={styles.createIcon}
                      name='md-add-circle' 
                      type='ionicon' 
                      size={30}
                      onPress={this.toggle}
                    />
                  }
                  <Text style={styles.offerHeaderText}>Offers</Text>
                </View>
                <ScrollView>
                  { this.render_offers() }
                </ScrollView>
              </View>
            </View>
          }
        </HeaderView>
    );
  }
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
    email: state.email
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addOffer,
    setBusinesses
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Business);