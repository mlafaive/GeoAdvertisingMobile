import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { Button } from 'react-native-elements';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false
    };

    this.submit = () => {
      // run get user
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.label}>
          <Text style={styles.text}>Sign In to GeoAdvertising!</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            textAlign={'center'}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="username"
            onChangeText={(username) => this.setState({username: username})}
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
            loading={this.state.loading}
            buttonStyle={styles.submit}
            textStyle={styles.submitText}
            title={'Login'}
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#DDDDDD',
    fontSize: 25
  },
  label: {
    paddingTop: 20,
    height: 80,
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
    height: 25,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  submitView: {
    paddingTop: 25,
    paddingRight: 125,
    paddingLeft: 125,
  },
  submit: {
    backgroundColor: '#2ECC40', 
    borderRadius: 10,
    height: 30
  },
  submitText: {
    textAlign: 'center',
    fontSize: 15
  }
});