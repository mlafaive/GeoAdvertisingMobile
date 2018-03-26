import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

import HeaderView from '../header_view/HeaderView.js';
import Business from '../business/Business.js';
import BusinessForm from '../business_form/BusinessForm.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccessToken } from '../../actions/token.js';
import { setEmail } from '../../actions/email.js';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';

import styles from './Styles.js';

class Businesses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      create: false,
      businesses: [],
      form_loading: false,
      form_error: '',
      open: null
    };

    this.open = (index) => {
      return () => this.setState({
        open: index
      });
    }

    this.render_businesses = () => {
      var items = [];
      for (var i = this.state.businesses.length - 1; i >= 0; i--) {
        items.push(
          <View key={i} style={styles.business}>
            <TouchableHighlight
              style={styles.businessOpen}
              underlayColor='#AAAAAA'
              onPress={this.open(i)}
            >
              <Text style={styles.businessText}>{this.state.businesses[i].name}</Text>
            </TouchableHighlight>
          </View>
        );
      }
      return items;
    }

    let url = '/users/' + this.props.email + '/businesses';
    GET(url)
    .then((data) => {
      this.setState({
        businesses: data.businesses,
        loading: false
      });
    })
    .catch((err) => {
      console.warn(err);
    });

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
        let new_businesses = this.state.businesses;
        new_businesses.push(data);
        this.setState({
          form_loading: false,
          businesses: new_businesses,
          form_error: '',
          create: false,
        });
      })
      .catch((err) => {
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
          { this.state.open !== null &&
            <View style={styles.fullScreen}>
              <Business 
                {...this.state.businesses[this.state.open]} 
                close={() => this.setState({ open: null })}
              />
            </View>
          }
        </HeaderView>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email
  };
}

export default connect(mapStateToProps)(Businesses);
