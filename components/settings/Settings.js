import React from 'react';
import { Text, View, TextInput, ActivityIndicator} from 'react-native';
import { Button, ButtonGroup, CheckBox, Icon } from 'react-native-elements';

import HeaderView from '../header_view/HeaderView.js';

import PropTypes from 'prop-types';
import styles from './Styles.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccessToken } from '../../actions/token.js';

import { GET, POST , PATCH } from '../../fetch_wrapper/FetchWrapper.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPage: true,

      loadingName: false,
      editingName: false,
      editNameText: ' Edit ',
      name: '',
      changePass: false,
      loadingPass: false,
      passButtonText: ' Change Password ',
      error: '',

      email: this.props.email,
      newPassword1: '',
      newPassword2: '',
      newPassword: '',
      interests: [],
      checked1: true,
      checked2: false,
      checked3: true,
      checked4: true
    };


    this.get_info = () => {

      GET('/users/'+this.props.email)
      .then((data) => {
        this.setState({
          name: data.name,
          interests: data.interests,
          loadingPage: false
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    }

    this.get_info();

    this.editName = () => {
      this.setState({
        editingName: !this.state.editingName
      });

      if (!this.state.editingName) {
        this.state.editNameText = 'Save';
      }

      if (this.state.editingName) {
        this.state.editNameText = '';
        this.state.loadingName = true;
        PATCH('/users/'+this.props.email, {name: this.state.name})
        .then((data) => {
          this.setState({
            editNameText: ' Edit ',
            loadingName: false
          });
        })
        .catch((err) => {
          console.warn(err);
        });
      } 
    }

    this.openPasswordChange = () => {

      if (!this.state.changePass) {
        this.setState({
          changePass: !this.state.changePass,
        });
        this.state.passButtonText = 'Save New Password';
      }
      if (this.state.changePass) {
        if (this.state.newPassword1 != this.state.newPassword2) {
          this.setState({error: 'passwords do not match!'});
          return;
        }
        if (this.state.newPassword1 == '') {
          this.setState({error: 'password fields are empty!'});
          return;
        }
        this.setState({
          changePass: !this.state.changePass,
          error: ''
        });
        this.state.passButtonText = '';
        this.state.loadingPass = true;
        PATCH('/users/'+this.props.email, {password: this.state.newPassword1})
        .then((data) => {
          this.setState({
            passButtonText: ' Change Password ',
            loadingPass: false,
            newPassword1: '',
            newPassword2: ''
          });
        })
        .catch((err) => {
          console.warn(err);
        });
      }
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
          { this.state.loadingPage ?
            <View style={styles.loader}>
              <ActivityIndicator size='large' color="#001f3f" />
            </View>
            :
            <View>
              <Text style={styles.settings}>Settings</Text>
              <View style={styles.rowsView}> 
                <Text style={styles.rows}>Name: </Text>
                { this.fillText('name') }
                <Button 
                  borderRadius={5}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  title={this.state.editNameText}
                  loading={this.state.loadingName}
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
                    title={this.state.passButtonText}
                    loading={this.state.loadingPass}
                    onPress={this.openPasswordChange}
                />
                { this.changePassword() }
                <Text style={styles.error} >
                  {this.state.error}
                </Text>
              </View>
            </View>
          }
          </View>
        </HeaderView>
    );
  }
}

Settings.propTypes = {

};

function mapStateToProps(state) {
  return {
    token: state.token,
    email: state.email
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAccessToken
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);