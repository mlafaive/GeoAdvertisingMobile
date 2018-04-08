import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import ReactRouterPropTypes from 'react-router-prop-types';

import PropTypes from 'prop-types';

import styles from './Styles.js';

/*
$white: #ffffff;
$blue: #3867d6;
$indigo: #3B3B98;
$purple: #8854d0;
$pink: #fc5c65;
$red: #eb3b5a;
$orange: #fa8231;
$yellow: #f7b731;
$green: #20bf6b;
$teal: #0fb9b1;
$cyan: #45aaf2;
$gray-lighter: #d1d8e0;
$gray: #778ca3;
$gray-dark: #4b6584;
$black: #1e272e;
*/

const colors = [
  '#3867d6',
  '#fa8231',
  '#20bf6b',
  '#fc5c65',
  '#45aaf2',
  '#f7b731',
  '#eb3b5a',
  '#0fb9b1'
];

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