import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Menu from '../menu/Menu.js';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import styles from './Styles.js';

class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };

    this.goto_settings = () => {
      this.props.history.push('/settings');
    }

    this.open_menu = () => {
      this.menu.getWrappedInstance().open();
    }
  }
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.container}>
          <Icon 
            raised
            containerStyle={styles.menu} 
            name='menu' 
            type='entypo'
            onPress={this.open_menu}
            size={12.5}
          />
          <Icon 
            reverse 
            containerStyle={styles.icon} 
            name='map-marker-circle' 
            type='material-community' 
            size={12.5}
          />
          <Icon 
            raised
            containerStyle={styles.settings} 
            name='settings' 
            type='feather' 
            size={12.5}
            onPress={this.goto_settings}
          />
        </View>
        { this.props.children }
        <Menu history={this.props.history} ref={ref => { this.menu = ref }}/>
      </View>
    );
  }
}

HeaderView.propTypes = {
  style: View.propTypes.style,
  history: ReactRouterPropTypes.history.isRequired
};

export default HeaderView;
