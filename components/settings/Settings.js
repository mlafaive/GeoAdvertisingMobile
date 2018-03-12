import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import HeaderView from '../header_view/HeaderView.js';
import PropTypes from 'prop-types';
import styles from './Styles.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: 'John',
      email: 'john@gmail.com',
      password: '123hackme',
      interests: 'none'
    };

    this.edit = () => {
      this.setState({
        editing: !this.state.editing
      });
    }

    this.fillText = (type) => {
      if(this.state.editing)
      {
          return (<TextInput 
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
}
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          <View style={styles.screen}>


            <View style={styles.settingsRow} >
              <Text style={styles.blank} > </Text>
              <Text style={styles.settings}>Settings</Text>
              <Button 
                  borderRadius={5}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  title={this.state.editing ? 'Save' : 'Edit '}
                  onPress={this.edit}
              />
            </View>
            <View style={styles.rowsView}> 
              <Text style={styles.rows}>Name: </Text>
              { this.fillText('name') }
            </View>
            <View style={styles.rowsView}> 
              <Text style={styles.rows}>Email: </Text>
              { this.fillText('email') }
            </View>
            <View style={styles.rowsView}> 
              <Text style={styles.rows}>Password: </Text>
              { this.fillText('password') }
            </View>
            <View style={styles.rowsView}> 
              <Text style={styles.rows}>Interests: </Text>
              { this.fillText('interests') }
            </View>
          </View>
        </HeaderView>
    );
  }
}

Settings.propTypes = {

};

export default Settings;