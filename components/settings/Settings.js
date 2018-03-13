import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button, ButtonGroup, CheckBox, Icon } from 'react-native-elements';
import HeaderView from '../header_view/HeaderView.js';
import PropTypes from 'prop-types';
import styles from './Styles.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingName: false,
      changePass: false,
      name: 'John',
      email: 'john@gmail.com',
      password: '123hackme',
      newPassword1: '',
      newPassword2: '',
      interest1: true,
      interest2: false,
      interest3: true,
      interest4: true,
      checked1: true,
      checked2: false,
      checked3: true,
      checked4: true
    };

    this.editName = () => {
      this.setState({
        editingName: !this.state.editingName
      });
    }

    this.openPasswordChange = () => {
      this.setState({
        changePass: !this.state.changePass
      });
    }

    this.fillText = (type) => {
      if(this.state.editingName)
      {
        return (
        <TextInput 
          style={styles.inputBox}
          textAlign='left'
          autoCapitalize='none'
          autoCorrect={false}
          value={this.state[type]}
          onChangeText={(input) => this.setState({[type]: input})}
          />);
      }
      else
      {
        return (<Text style={styles.inputText}>{this.state[type]}</Text>);
      }
    }

    this.interests = () => {
      return (
        <View>
          <View style={styles.individualInterestsRow} >
            <CheckBox 
              style={styles.individualInterests}
              title='interest1'
              checked={this.state.checked1}
              onPress={() => this.setState({ checked1: !this.state.checked1 })}
            />
            <CheckBox 
              style={styles.individualInterests}
              title='interest2'
              checked={this.state.checked2}
              onPress={() => this.setState({ checked2: !this.state.checked2 })}
            />
          </View>
          <View style={styles.individualInterestsRow} >
            <CheckBox 
              style={styles.individualInterests}
              title='interest3'
              checked={this.state.checked3}
              onPress={() => this.setState({ checked3: !this.state.checked3 })}
            />
            <CheckBox 
              style={styles.individualInterests}
              title='interest4'
              checked={this.state.checked4}
              onPress={() => this.setState({ checked4: !this.state.checked4 })}
            />
          </View>
        </View>
      );
    }

    this.changePassword = () => {
      if(this.state.changePass)
      {
        return (
          <View style={styles.passwordBox}>
            <View style={styles.passwordsSpacing}>
              <TextInput 
              style={styles.passwordInputBox}
              textAlign='left'
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Enter new password'
              value={this.state.newPassword1}
              onChangeText={(input) => this.setState({ newPassword1: input})}
              />
            </View>
            <View style={styles.passwordsSpacing}>
              <TextInput 
              style={styles.passwordInputBox}
              textAlign='left'
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Re-enter new password'
              value={this.state.newPassword2}
              onChangeText={(input) => this.setState({ newPassword2: input})}
              />
            </View>
          </View>
        );
      }
    }
}
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          <View style={styles.screen}>
            <Text style={styles.settings}>Settings</Text>
            <View style={styles.rowsView}> 
              <Text style={styles.rows}>Name: </Text>
              { this.fillText('name') }
              <Button 
                borderRadius={5}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                title={this.state.editingName ? 'Save' : ' Edit '}
                onPress={this.editName}
              />
            </View>
            <View style={styles.rowsView}> 
              <Text style={styles.rows}>Email: </Text>
              <Text style={styles.inputEmail}>{this.state.email}</Text>
            </View>
            <View style={styles.rowsView} >
              <Text style={styles.rows}>Interests: </Text>
            </View>
            { this.interests() }
            <View style={styles.passwordRowsView}> 
              <Button 
                  borderRadius={5}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  title={this.state.changePass ? 'Save New Password' : ' Change Password '}
                  onPress={this.openPasswordChange}
              />
              { this.changePassword() }
            </View>
          </View>
        </HeaderView>
    );
  }
}

Settings.propTypes = {

};

export default Settings;