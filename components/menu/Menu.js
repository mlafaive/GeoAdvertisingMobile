import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.width = 0;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.open) {
      var interval = setInterval(() => {
        if (this.width === 200) {
          clearInterval(interval);
        }
        this.width += 10;
        this.menu.setNativeProps({
          width: this.width
        });
      }, 10);
    }
    else {
      var interval = setInterval(() => {
        if (this.state.width === 0) {
          clearInterval(interval);
        }
        this.width += 10;
        this.menu.setNativeProps({
          width: this.width
        });
      }, 10)
    }
  } 
  open() {
    this.setState({
      open: true
    });
  }
  render() {
    var widthStyle = StyleSheet.create({ width: this.state.width });
    const menuStyles = StyleSheet.flatten([styles.menu, widthStyle]);
    return (
        <View style={this.state.open ? styles.container : styles.hidden}>
          <View style={menuStyles} ref={ref => { this.menu = ref }}>
            <Text style={styles.menuText}>Menu</Text>
          </View>
          <View style={this.state.open ? styles.overlay : styles.hidden}>
          </View>
        </View>
    );
  }
}

export default Menu;