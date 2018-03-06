import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Animated } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

const type = {
  USER: 0,
  BUSINESS: 1
};

const state = {
  LOGIN: 0,
  CREATE: 1
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
      iconSize: 50,
      iconViewHeight: 150,
    };

    this.submit = () => {
      // run get user or business info and redirect when validated
      // how to redirect: `this.props.history.push('/user');`
    }

    this.switch_type = (type) => {
      this.setState({
        type: type
      });
    }

    this.enlarge_icon = () => {
      var interval = setInterval(() => {
        if (this.state.iconSize === 50) {
          clearInterval(interval);
          return;
        }
        this.setState({
          iconSize: this.state.iconSize + 1,
          iconViewHeight: this.state.iconViewHeight + 3

        });
      }, 10);
    }

    this.shrink_icon = () => {
      var interval = setInterval(() => {
        if (this.state.iconSize === 25) {
          clearInterval(interval);
          return;
        }
        this.setState({
          iconSize: this.state.iconSize - 1,
          iconViewHeight: this.state.iconViewHeight - 3

        });
      }, 10);
    }

    this.change_state = () => {
      // animation
      if (this.state.state === state.LOGIN) {
        this.setState({
          state: state.CREATE,
          login_text: 'Sign Up'
        });
        this.shrink_icon();
      }
      else {
        this.setState({
          state: state.LOGIN,
          login_text: 'Login'
        });
        this.enlarge_icon();
      }

    }

    this.create_input = (i, placeholder, field) => {
      return (
        <View key={i} style={styles.inputView}>
            <TextInput
              style={styles.input}
              textAlign='center'
              autoCapitalize='none'
              autoCorrect={false}
              placeholder={placeholder}
              onChangeText={(input) => this.setState({[field]: input})}
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
      items.push(this.create_input(2, 'password', 'password'));

      if (this.state.state === state.CREATE){
        items.push(this.create_input(3, 're-enter password', 'password2'));
      }
      return items;
    }
  }

  render() {
    let iconView = styles.iconView;
    iconView.height = this.state.iconViewHeight;
    return (
      <View style={styles.container}>
        <View style={iconView}>
          <Icon 
            reverse 
            containerStyle={styles.icon} 
            name='map-marker-circle' 
            type='material-community' 
            size={this.state.iconSize}
          />
        </View>
        <View style={styles.typeView}>
          <ButtonGroup
            disableSelected
            onPress={this.switch_type}
            selectedIndex={this.state.type}
            selectedButtonStyle={styles.selectedType}
            selectedTextStyle={styles.selectedTypeText}
            buttonStyle={styles.type}
            textStyle={styles.typeText}
            buttons={['User', 'Business']}
            containerStyle={styles.typeButtons} 
          />
        </View>
        { this.render_inputs() }
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    backgroundColor: '#001f3f'
  },
  typeView: {
    alignItems: 'center',
  },
  typeButtons: {
    width: 200,
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#001f3f'
  },
  selectedType: {
    backgroundColor: '#FFFFFF'
  },
  selectedTypeText: {
    color: '#001f3f',
    fontWeight: '900'
  },
  type: {
    backgroundColor: '#001f3f'
  },
  typeText: {
    color: '#FFFFFF',
  },
  text: {
    color: '#111111',
    fontSize: 25
  },
  iconView: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputView: {
    paddingTop: 10,
    paddingRight: 25,
    paddingLeft: 25,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 35,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  submitView: {
    paddingTop: 15,
    paddingRight: 80,
    paddingLeft: 80,
  },
  submitCont: {
    borderRadius: 5,
  },
  submit: {
    backgroundColor: '#79C753', 
    borderRadius: 5,
    height: 30
  },
  submitText: {
    textAlign: 'center',
    fontSize: 17.5,
    color: '#001f3f'
  },
  createView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
  },
  createText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 35
  },
  createButton: {
    backgroundColor: '#001f3f',
    padding: 7.5,
    borderRadius: 15,
  },
  createButtonText: {
    color: '#FFFFFF'
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  footerText: {
    fontSize: 7.5
  }
});