import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import styles from './Styles.js';

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Business</Text>
        </View>
    );
  }
}

export default Business;
