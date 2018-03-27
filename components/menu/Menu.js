import React from 'react';
import { Text, View, PanResponder, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

import { Button } from 'react-native-elements';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccessToken, setRefreshToken } from '../../actions/token.js';
import { setEmail } from '../../actions/email.js';
import { clearUser } from '../../actions/user.js';
import { clearBusinesses } from '../../actions/businesses.js';

import styles from './Styles.js';

var screenSize = Dimensions.get('window').width
var menuWidth = (screenSize*2)/3;
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.settings = () => {
      this.props.history.push('/settings');
    }

    this.businesses = () => {
      this.props.history.push('/businesses');
    }

    this.home = () => {
      this.props.history.push('/offers');
    }

    this.logout = () => {
      this.props.setAccessToken();
      this.props.setRefreshToken();
      this.props.setEmail('');
      this.props.clearUser();
      this.props.clearBusinesses();
      this.props.history.push('/');
    }

    this.left = -1*menuWidth;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx < -50 && gestureState.vx < 0) {
          this.setState({
            open: false
          });
        }
      }
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.open) {
      this.container.setNativeProps({
        width: screenSize
      });
      var interval = setInterval(() => {
        if (this.left === 0) {
          clearInterval(interval);
        }
        if (this.left + 10 > 0) {
          this.left = 0;
        }
        else {
          this.left += 10;
        }
        this.menu.setNativeProps({
          left: this.left
        });
      }, 10);
    }
    else if (!this.state.open){
      var interval = setInterval(() => {
        if (this.left === (-1*menuWidth)) {
          clearInterval(interval);
          this.container.setNativeProps({
            width: 0
          });
          this.menu.setNativeProps({
            left: 0
          });
        }
        if (this.left - 10 < (-1*menuWidth)) {
          this.left = (-1*menuWidth);
        }
        else {
          this.left -= 10;
        }
        this.menu.setNativeProps({
          left: this.left
        });
      }, 10)
    }
  } 
  componentDidMount() {
    this.menu.setNativeProps({
      left: (-1*menuWidth)
    });
    this.container.setNativeProps({
      width: 0
    });
  }
  open() {
    this.setState({
      open: true
    });
  }
  render() {
    return (
        <View 
          style={styles.container} 
          {...this._panResponder.panHandlers}
          ref={ref => { this.container = ref }}
        >
          <View style={this.state.open ? styles.overlay : styles.hidden}>
          </View>
          <View style={styles.menu} ref={ref => { this.menu = ref }}>
            <Button
              containerViewStyle={styles.buttonView}
              buttonStyle={styles.button}
              textStyle={styles.menuText}
              title='Home'
              onPress={this.home}
            />
            <Button
              containerViewStyle={styles.buttonView}
              buttonStyle={styles.button}
              textStyle={styles.menuText}
              title='My Businesses'
              onPress={this.businesses}
            />
            <Button
              containerViewStyle={styles.buttonView}
              buttonStyle={styles.button}
              textStyle={styles.menuText}
              title='Account Settings'
              onPress={this.settings}
            />
            <Button
              containerViewStyle={styles.buttonView}
              buttonStyle={styles.button}
              textStyle={styles.menuText}
              title='Sign Out'
              onPress={this.logout}
            />
          </View>
        </View>
    );
  }
}

Menu.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAccessToken,
    setRefreshToken,
    setEmail,
    clearUser,
    clearBusinesses
  }, dispatch);
}

export default connect(null, mapDispatchToProps, null, { withRef: true })(Menu);