import React from 'react';
import { Text, View, ScrollView } from 'react-native';

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
        <View style={styles.container}>
          <ScrollView>
            { this.render_offers() }
          </ScrollView>
        </View>
    );
  }
}