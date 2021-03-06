import React from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GET, POST } from '../../fetch_wrapper/FetchWrapper.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccessToken, setRefreshToken } from '../../actions/token.js';
import { setEmail } from '../../actions/email.js';

import styles from './Styles.js';

const state = {
  LOGIN: 0,
  CREATE: 1
}

function valid_email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Login extends React.Component {
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
      error: ''
    };



    this.login = () => {
      if (!valid_email(this.state.email.trim())) {
        this.setState({error: 'please enter a valid email'})
        return;
      }

      var password_regex = /^([a-zA-Z0-9!@$&?]+)$/;
      if(!password_regex.test(this.state.password)) {
        this.setState({error: 'please enter a valid password'})
        return;
      }
      POST('/login', {
        email: this.state.email.trim(),
        password: this.state.password
      })
      .then((data) => {
        this.props.setAccessToken(data.access_token);
        this.props.setRefreshToken(data.refresh_token);
        this.props.setEmail(this.state.email);
        this.props.history.push('/offers');
      })
      .catch((err) => {
        err.json().then((data) => {
          this.setState({error: data.error, loading: false, login_text: 'Login'})
        });
      });
      this.setState({loading: true, login_text: ''});
    }

    this.create = () => {
      // TODO: validate here
      var name_regex = /^([a-zA-Z ]+)$/;
      if(!name_regex.test(this.state.name.trim())) {
        this.setState({error: 'please enter a valid name'})
        return;
      }

      if (!valid_email(this.state.email.trim())) {
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

      POST('/users', {
        email: this.state.email.trim(),
        password: this.state.password,
        name: this.state.name.trim()
      })
      .then((data) => {
        this.props.setAccessToken(data.access_token);
        this.props.setRefreshToken(data.refresh_token);
        this.props.setEmail(this.state.email);
        this.props.history.push('/offers');
      })
      .catch((err) => {
        err.json().then((data) => {
          this.setState({error: data.error, loading: false, login_text: 'Sign Up'})
        });
      });
      this.setState({loading: true, login_text: ''});
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

    this.change_state = () => {
      // animation
      if (this.state.state === state.LOGIN) {
        this.setState({
          state: state.CREATE,
          login_text: 'Sign Up',
          email: '',
          password: '',
          error: ''
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
          error: ''
        });
      }

    }

    this.create_input = (i, placeholder, field, secured = false) => {
      return (
        <TextField
          key={i}
          containerStyle={styles.inputView}
          textColor='#FFFFFF'
          tintColor='#FFFFFF'
          baseColor='#FFFFFF'
          inputContainerPadding={2}
          labelHeight={20}
          autoCapitalize='none'
          autoCorrect={false}
          label={placeholder}
          value={this.state[field]}
          onChangeText={ (input) => this.setState({ [field]: input }) }
          secureTextEntry={secured}
          disabled={this.state.loading}
        />
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
        <KeyboardAwareScrollView 
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
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
              raised={!this.state.loading}
              borderRadius={5}
              containerViewStyle={styles.submitCont}
              loading={this.state.loading}
              buttonStyle={styles.submit}
              textStyle={styles.submitText}
              title={this.state.login_text}
              onPress={this.submit}
              disabled={this.state.loading}
            />
          </View>
          <View style={styles.createView}>
            <Text style={styles.createText}>
              {this.state.state === state.LOGIN ? 'New?' : 'Already have an account?'}
            </Text> 
            <TouchableHighlight 
              style={styles.createButton}
              onPress={this.change_state}
              disabled={this.state.loading}
            >
              <Text style={styles.createButtonText}>
                {this.state.state === state.LOGIN ? 'Sign Up' : 'Login'}
              </Text>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Mitchell LaFaive | Luis Sosa | Nathan Wernert | Anthony Opipari | Hon Kwok</Text>
          <Text style={styles.footerText}>GeoAdvertising &copy;</Text>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAccessToken,
    setRefreshToken,
    setEmail
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);