import React from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import { POST } from '../../fetch_wrapper/FetchWrapper.js';

import styles from './Styles.js';

const type = {
  USER: 0,
  BUSINESS: 1
};

const state = {
  LOGIN: 0,
  CREATE: 1
}

function valid_email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: state.LOGIN,
      email: '',
      password: '',
      name: '',
      password2: '',
      type: 'user',
      loading: false,
      login_text: 'Login',
      type: type.USER,
      iconViewHeight: 150,
      error: ''
    };



    this.login = () => {
      // if (!valid_email(this.state.email)) {
      //   this.setState({error: 'please enter a valid email'})
      //   return;
      // }

      // var password_regex = /^([a-zA-Z0-9!@$&?]+)$/;
      // if(!password_regex.test(this.state.password)) {
      //   this.setState({error: 'please enter a valid password'})
      //   return;
      // }
      // console.warn('valid request');
      this.props.history.push('/user');

    }

    this.create = () => {
      // TODO: validate here
      var name_regex = /^([a-zA-Z ]+)$/;
      if(!name_regex.test(this.state.name)) {
        this.setState({error: 'please enter a valid name'})
        return;
      }

      if (!valid_email(this.state.email)) {
        this.setState({error: 'please enter a valid email'})
        return;
      }

      var password_regex = /^([a-zA-Z0-9!@$&?]+)$/;
      if(!password_regex.test(this.state.password)) {
        this.setState({error: 'please enter a valid password'})
        return;
      } 

      if (this.state.password !== this.state.password2) {
        this.setState({error: 'passwords do not match'})
        return;
      }
    }

    this.submit = () => {
      // run get user or business info and redirect when validated
      if (this.state.state === state.LOGIN) {
        this.login();
      }
      else {
        this.create();
      }
      
    }

    this.switch_type = (type) => {
      this.setState({
        type: type
      });
    }

    this.change_state = () => {
      // animation
      if (this.state.state === state.LOGIN) {
        this.setState({
          state: state.CREATE,
          login_text: 'Sign Up',
          email: '',
          password: '',
        });
      }
      else {
        this.setState({
          state: state.LOGIN,
          login_text: 'Login',
          email: '',
          password: '',
          name: '',
          password2: '',
        });
      }

    }

    this.create_input = (i, placeholder, field, secured = false) => {
      return (
        <View key={i} style={styles.inputView}>
            <TextInput
              style={styles.input}
              textAlign='center'
              autoCapitalize='none'
              autoCorrect={false}
              placeholder={placeholder}
              value={this.state[field]}
              onChangeText={(input) => this.setState({[field]: input, error: ''})}
              secureTextEntry={secured}
            />
          </View>
      );
    }

    this.render_inputs = () => {
      let items = [];
      if (this.state.state === state.CREATE) {
        items.push(this.create_input(0, 'name', 'name'));
      }

      items.push(this.create_input(1, 'email', 'email'));
      items.push(this.create_input(2, 'password', 'password', true));

      if (this.state.state === state.CREATE){
        items.push(this.create_input(3, 're-enter password', 'password2', true));
      }
      return items;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Icon 
            reverse 
            containerStyle={styles.icon} 
            name='map-marker-circle' 
            type='material-community' 
            size={50}
          />
        </View>
        { this.render_inputs() }
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>
        <View style={styles.submitView}>
          <Button
            raised
            borderRadius={5}
            containerViewStyle={styles.submitCont}
            loading={this.state.loading}
            buttonStyle={styles.submit}
            textStyle={styles.submitText}
            title={this.state.login_text}
            onPress={this.submit}
          />
        </View>
        <View style={styles.createView}>
          <Text style={styles.createText}>
            {this.state.state === state.LOGIN ? 'New?' : 'Already have an account?'}
          </Text> 
          <TouchableHighlight 
            style={styles.createButton}
            onPress={this.change_state}
          >
            <Text style={styles.createButtonText}>
              {this.state.state === state.LOGIN ? 'Sign Up' : 'Login'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Mitchell LaFaive | Luis Sosa | Nathan Wernert | Anthony Opipari | Hon Kwok</Text>
          <Text style={styles.footerText}>GeoAdvertising &copy;</Text>
        </View>
      </View>
    );
  }
}