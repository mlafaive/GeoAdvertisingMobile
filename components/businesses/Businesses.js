import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import HeaderView from '../header_view/HeaderView.js';
import Business from '../business/Business.js';

import styles from './Styles.js';

class Businesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.render_businesses = () => {
      return [
        <Business key={0} id={0}/>,
        <Business key={1} id={0}/>
      ];
    }
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          <ScrollView>
            { this.render_businesses() }
          </ScrollView>
        </HeaderView>
    );
  }
}

export default Businesses;
