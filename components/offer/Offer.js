import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import ReactRouterPropTypes from 'react-router-prop-types';

import PropTypes from 'prop-types';

import { colors } from '../../Constants.js';

import styles from './Styles.js';

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.open = () => {
      this.props.history.push('/offers/' + this.props.id);
    }

    this.render_header = () => {
      let items = [];
      if (this.props.hasOwnProperty('business')) {
        items.push(
          <View key={0} style={styles.name}>
            <Text style={styles.headerText}>{ this.props.business.name }</Text>
          </View>
        );
      }

      if (this.props.hasOwnProperty('distance')) {
        items.push(
          <View key={1} style={styles.distance}>
            <Text style={styles.headerText}>{ String(Math.round(this.props.distance * 10) / 10)} mi</Text>
          </View>
        )
      }

      return items;
    }

    this.render_interests = () => {
      let interests = [];
      for (var i = 0; i < this.props.interests.length; i += 2) {
        let index = this.props.interests[i].id % colors.length;
        let style_obj = {
          color1: {
            backgroundColor: colors[index],
            borderColor: colors[index],
          },
        };

        let second = i + 1 < this.props.interests.length;
        if (second) {
          index = this.props.interests[i + 1].id % colors.length;
          style_obj.color2 = {
            backgroundColor: colors[index],
            borderColor: colors[index]
          }
        }

        let style =  StyleSheet.create(style_obj);
        interests.push(
          <View key={i} style={styles.innerInterests}>
            <View style={[style.color1, styles.interest]}>
              <Text style={styles.interestText}>{ this.props.interests[i].name }</Text>
            </View>
            {
              second 
              ?
              <View key={i} style={[style.color2, styles.interest]}>
                <Text style={styles.interestText}>{ this.props.interests[i + 1].name }</Text>
              </View>
              :
              <View style={styles.filler}/>
            }
          </View>
        );
      }
      return (
        <View style={styles.interests}>{ interests }</View>
      );
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.open} underlayColor='#AAAAAA'>
        <View style={styles.container}>
          <View style={styles.header}>
            { this.render_header() }
          </View>
          <View style={styles.description}>
            <Text style={styles.text}>{ this.props.description }</Text>
          </View>
          { this.render_interests() }
        </View>
      </TouchableHighlight>
    );
  }
}

Offer.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  interests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.name
  })).isRequired,
  distance: PropTypes.number,
  business: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
};

export default Offer;