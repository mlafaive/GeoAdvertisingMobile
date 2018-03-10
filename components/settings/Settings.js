import React from 'react';
import { Text, View } from 'react-native';

import HeaderView from '../header_view/HeaderView.js';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          <Text>Settings</Text>
        </HeaderView>
    );
  }
}

Settings.propTypes = {

};

export default Settings;