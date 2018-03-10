import React from 'react';
import { Text, View } from 'react-native';

import Feed from '../feed/Feed.js';
import HeaderView from '../header_view/HeaderView.js';

import styles from './Styles.js';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };

    this.toggle_menu = () => {
      this.setState({
        menu: !this.state.menu
      });
    }
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          <Feed/>
        </HeaderView>
    );
  }
}
