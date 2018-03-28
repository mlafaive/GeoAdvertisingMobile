import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

import HeaderView from '../header_view/HeaderView.js';
import Business from '../business/Business.js';
import BusinessForm from '../business_form/BusinessForm.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setBusinesses, addBusiness } from '../../actions/businesses.js';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';

import styles from './Styles.js';

class Businesses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      create: false,
      form_loading: false,
      form_error: '',
      open: null
    };

    this.open = (index) => {
      return () => this.props.history.push('/businesses/' + index);
    }

    this.render_businesses = () => {
      var items = [];
      this.props.businesses.each((i, b) => {
        items.push(
          <View key={i} style={styles.business}>
            <TouchableHighlight
              style={styles.businessOpen}
              underlayColor='#AAAAAA'
              onPress={this.open(b.id)}
            >
              <Text style={styles.businessText}>{b.name}</Text>
            </TouchableHighlight>
          </View>
        );
      });
      return items;
    }
    if (this.props.businesses === null || !this.props.businesses.hasOwnProperty('businesses')) {
      let url = '/users/' + this.props.email + '/businesses';
      GET(url)
      .then((data) => {
        this.props.setBusinesses(data.businesses);
        this.setState({
          loading: false
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    }
    else {
      this.state.loading = false;
    }

    this.create = () => {
      this.setState({
        create: true
      });
    };

    this.cancel = () => {
      if (this.state.form_loading) {
        return;
      }
      this.setState({
        create: false,
        form_error: ''
      });
    };

    this.create_business = (state) => {
      var alpha_numeric = /^([a-zA-Z0-9.\- ]+)$/;
      if(!alpha_numeric.test(state.store_address)) {
        this.setState({form_error: 'please enter a valid address'})
        return;
      }
      var alpha = /^([a-zA-Z ]+)$/;
      if(!alpha.test(state.city_name)) {
        this.setState({form_error: 'please enter a valid city'})
        return;
      }
      if(!alpha.test(state.state_name)) {
        this.setState({form_error: 'please enter a valid state'})
        return;
      }

      this.setState({
        form_loading: true,
      });
      POST('/businesses', state)
      .then((data) => {
        this.props.addBusiness(data);
        this.setState({
          form_loading: false,
          form_error: '',
          create: false,
        });
      })
      .catch((err) => {
        console.log(err);
        err.json().then((data) => {
          this.setState({form_error: data.error, form_loading: false})
        });
      });
    };
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          { this.state.loading ?
            <View style={styles.loader}>
              <ActivityIndicator size='large' color="#001f3f" />
            </View>
            :
            <View style={styles.content}>
              <View key={0} style={styles.headerView}>
                <Button
                    raised
                    borderRadius={5}
                    containerViewStyle={styles.buttonCont}
                    buttonStyle={styles.submit}
                    textStyle={styles.submitText}
                    title="Create New"
                    onPress={this.create}
                    iconRight={{
                      containerStyle: styles.icon, 
                      name: 'md-add-circle', 
                      type: 'ionicon', 
                      size: 20
                    }}
                />
              </View>
              <ScrollView>
                { this.render_businesses() }
              </ScrollView>
            </View>
          }
          { this.state.create && 
            <View style={styles.fullScreen}>
              <BusinessForm
                onSave={this.create_business} 
                loading={this.state.form_loading}
                error={this.state.form_error}
                onClose={this.cancel}
              />
            </View>
          }
        </HeaderView>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
    businesses: state.businesses
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setBusinesses,
    addBusiness
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
