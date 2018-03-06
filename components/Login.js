import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Animated } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

import Cookie from 'react-native-cookie';

const type = {
  USER: 0,
  BUSINESS: 1
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      type: 'user',
      loading: false,
      login_text: 'Login',
      type: type.USER,
      iconSize: 50,
      iconViewHeight: 150
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

    this.create = () => {
      // animation
      // var interval = setInterval(() => {
      //   if (this.state.iconSize === 25) {
      //     clearInterval(interval);
      //     return;
      //   }
      //   this.setState({
      //     iconSize: this.state.iconSize - 1,
      //     iconViewHeight: this.state.iconViewHeight - 3

      //   });
      // }, 10);

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
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            textAlign='center'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="email"
            onChangeText={(email) => this.setState({email: email})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            textAlign={'center'}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(password) => this.setState({password: password})}
          />
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
          <Text style={styles.createText}>New?</Text> 
          <TouchableHighlight 
            style={styles.createButton}
            onPress={this.create}
          >
            <Text style={styles.createButtonText}>Sign Up</Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
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
    color: '#001f3f'
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
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputView: {
    paddingTop: 20,
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
    paddingTop: 25,
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
    paddingTop: 20,
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