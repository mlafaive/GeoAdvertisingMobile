import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import ReactRouterPropTypes from 'react-router-prop-types';

import HeaderView from '../header_view/HeaderView.js';
import Offer from '../offer/Offer.js';

import styles from './Styles.js';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.render_offers = () => {
      return [
        <Offer key={0} id={0} description={'greatest deal ever!!!!!'}/>,
        <Offer key={1} id={0} description={'greatest deal ever (even more)!!!!!'}/>
      ];
    }
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          <ScrollView>
            { this.render_offers() }
          </ScrollView>
        </HeaderView>
    );
  }
}

Feed.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};