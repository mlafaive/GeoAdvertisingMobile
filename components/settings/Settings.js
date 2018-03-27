import React from 'react';
import { Text, View, TextInput, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import { Button, ButtonGroup, CheckBox, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HeaderView from '../header_view/HeaderView.js';

import PropTypes from 'prop-types';
import styles from './Styles.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../../actions/user.js';
import { setInterests } from '../../actions/interests.js';

import { GET, POST , PATCH } from '../../fetch_wrapper/FetchWrapper.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPage: true,
      loadingName: false,
      editNameText: ' Save ',
      editButtonDisabled: true,
      name: props.user === null ? null : props.user.name,
      changePass: false,
      loadingPass: false,
      passButtonText: ' Change Password ',
      error: '',
      newPassword1: '',
      newPassword2: '',
      enteredOldPassword: '',
      interests: props.user === null ? null : props.user.interests,
    };


    this.get_info = (interests) => {
      GET('/users/'+this.props.email)
      .then((data) => {
        let new_interests = interests;
      
        for (var i = 0; i < new_interests.length; i++) {
          new_interests[i].checked = false;
        }

        for(var i = 0; i < new_interests.length; i++) {
          for(var j = 0; j < data.interests.length; j++) {
            if (new_interests[i].id === data.interests[j].id) {
              new_interests[i].checked = true;
            }
          }
        }
        this.props.setUser({
          name: data.name,
          interests: new_interests
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    }

    if (this.props.interests === null) {
      GET('/interests')
      .then((res) => {
        this.props.setInterests(res.interests);
      })
      .catch((err) => {
        console.warn(err);
      });
    }
    else if (props.user !== null){
      this.state.loadingPage = false;
    }

    this.editName = () => {
      this.setState({
        editNameText: '',
        loadingName: true
      });
      let new_interests = [];
      for (var i = 0; i < this.state.interests.length; i++) {
        if (this.state.interests[i].checked) {
          new_interests.push(this.state.interests[i].id);
        }
      }
      PATCH('/users/'+this.props.email, {
        name: this.state.name,
        interests: new_interests
      })
      .then((data) => {
        this.setState({
          editNameText: ' Save ',
          loadingName: false,
          editButtonDisabled: true
        });

        this.props.setUser({
          name: this.state.name,
          interests: this.state.interests
        });

      })
      .catch((err) => {
        console.warn(err);
      });
    } 

    this.handle_check = (i) => {
      return () => {
        let current = this.state.interests;
        current[i].checked = !current[i].checked;
        this.setState({ interests: current, editButtonDisabled: false});
      }
    }

    this.interests = () => {
      let items = [];
      for (var i = 0; i < this.state.interests.length; i += 2) {
        items.push(
          <View style={styles.individualInterestsRow} key={i}>
            { i + 1 >= this.state.interests.length &&
              <View style={styles.spacer}></View>
            }
            <CheckBox 
              containerStyle={styles.individualInterests}
              title={this.state.interests[i].name}
              checked={this.state.interests[i].checked}
              onPress={this.handle_check(i)}
            />
            { i + 1 < this.state.interests.length ?
              <CheckBox 
                containerStyle={styles.individualInterests}
                title={this.state.interests[i + 1].name}
                checked={this.state.interests[i + 1].checked}
                onPress={this.handle_check(i + 1)}
              />
              :
              <View style={styles.spacer}></View>
            }
          </View>
        );
      }
      return items;
    }

    this.openPasswordChange = () => {

      if (!this.state.changePass) {
        this.setState({
          changePass: !this.state.changePass,
        });
        this.state.passButtonText = 'Save';
      }
      if (this.state.changePass) {
        if (this.state.enteredOldPassword === '') {
          this.setState({error: 'please enter old password'});
        }
        if (this.state.newPassword1 !== this.state.newPassword2) {
          this.setState({error: 'passwords do not match!'});
          return;
        }
        if (this.state.newPassword1 === '') {
          this.setState({error: 'password fields are empty!'});
          return;
        }
        this.setState({
          changePass: !this.state.changePass,
          error: ''
        });
        this.state.passButtonText = '';
        this.state.loadingPass = true;
        PATCH('/users/'+this.props.email, {
          password: this.state.newPassword1,
          old_password: this.state.enteredOldPassword,
        })
        .then((data) => {
          this.setState({
            passButtonText: ' Change Password ',
            loadingPass: false,
            newPassword1: '',
            newPassword2: '',
            enteredOldPassword: '',
            changePass: false,
            error: ''
          });
        })
        .catch((err) => {
          err.json().then((data) => {
            this.setState({
              error: data.error, 
              loadingPass: false,
              passButtonText: 'Save',
              changePass: true,
            })
          });
        });
      }
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
              placeholder='Enter old password'
              value={this.state.enteredOldPassword}
              onChangeText={(input) => this.setState({ enteredOldPassword: input, error: ''})}
              secureTextEntry={true}
              />
            </View>
            <View style={styles.passwordsSpacing}>
              <TextInput 
              style={styles.passwordInputBox}
              textAlign='left'
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Enter new password'
              value={this.state.newPassword1}
              onChangeText={(input) => this.setState({ newPassword1: input, error: ''})}
              secureTextEntry={true}
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
              onChangeText={(input) => this.setState({ newPassword2: input, error: ''})}
              secureTextEntry={true}
              />
            </View>
          </View>
        );
      }
    }

    this.passwordButton = () => {
      if(this.state.changePass) {
        return (
          <Button
            borderRadius={5}
            buttonStyle={styles.buttonPass}
            textStyle={styles.buttonText}
            title={"Cancel"}
            onPress={this.passwordCancel}
          />
          );
      }
    }

    this.passwordCancel = () => {
      this.setState({
          changePass: !this.state.changePass,
          newPassword1: '',
          newPassword2: '',
          enteredOldPassword: '',
          passButtonText: ' Change Password ',
          error: ''
        });
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.interests !== null && this.props.interests === null){
        this.get_info(nextProps.interests);
    }
    if (nextProps.user !== null) {
      this.setState({
        name: nextProps.user.name,
        interests: nextProps.user.interests,
        loadingPage: false
      });
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

            <KeyboardAwareScrollView 
                  style={styles.avoidKeyboard} 
                  resetScrollToCoords={{ x: 0, y: 0 }}
                  scrollEnabled={true}
                  extraScrollHeight={60}
                  >
              <View>
                <View style={styles.rowsView}>
                  <Text style={styles.blank}> </Text>
                  <Text style={styles.settings}>Settings</Text>
                  <Button 
                    borderRadius={5}
                    disabled={this.state.editButtonDisabled}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    title={this.state.editNameText}
                    loading={this.state.loadingName}
                    onPress={this.editName}
                  />
                </View>
                <View style={styles.rowsView}> 
                  <Text style={styles.rows}>Email: </Text>
                  <Text style={styles.inputEmail}>{this.props.email}</Text>
                </View>
                <View style={styles.rowsView}> 
                  <Text style={styles.rows}>Name: </Text>
                  <TextInput 
                    style={styles.inputBox}
                    textAlign='left'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={this.state.name}
                    onChangeText={(input) => this.setState({name: input, editButtonDisabled: false})}
                    />
                </View>
                <View style={styles.interestsHeader} >
                  <Text style={styles.interestsHeaderText}>Interests</Text>
                </View>
                { this.interests() }
                <View style={styles.passwordRowsView}> 
                    <View style={styles.passwordButtonStyle}>
                      <Button 
                        borderRadius={5}
                        buttonStyle={styles.buttonPass}
                        textStyle={styles.buttonText}
                        title={this.state.passButtonText}
                        loading={this.state.loadingPass}
                        loadingProps={{ color: "#111111" }}
                        onPress={this.openPasswordChange}
                      />
                      { this.passwordButton() }
                    </View>
                    { this.changePassword() }
                    <View style={styles.errorView} >
                      <Text style={styles.error} >
                        {this.state.error}
                      </Text>
                    </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
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
    email: state.email,
    user: state.user,
    interests: state.interests
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser,
    setInterests
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
