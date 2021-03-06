import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';

import HeaderView from '../header_view/HeaderView.js';
import OfferForm from '../offer_form/OfferForm.js';

import { colors } from '../../Constants.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setOffer, deleteOffer } from '../../actions/businesses.js';

import { GET, PATCH, DELETE, POST } from '../../fetch_wrapper/FetchWrapper.js';

import PropTypes from 'prop-types';

import styles from './Styles.js';

class OfferFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      loading: true,
      loading_accept: false,
      form_loading: false,
      deleting: false,
      form_error: '',
      offer: {}
    };
    this.get = (id) => {
      GET('/offers/' + id)
      .then((data) => {
        this.setState({
          offer: data,
          loading: false,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
    }
    this.get(props.match.params.id);

    this.close = () => {
      this.props.history.goBack();
    }

    this.render_interests = () => {
      let interests = [];
      for (var i = 0; i < this.state.offer.interests.length; i += 2) {
        let index = this.state.offer.interests[i].id % colors.length;
        let style_obj = {
          color1: {
            backgroundColor: colors[index],
            borderColor: colors[index],
          },
        };

        let second = i + 1 < this.state.offer.interests.length;
        if (second) {
          index = this.state.offer.interests[i + 1].id % colors.length;
          style_obj.color2 = {
            backgroundColor: colors[index],
            borderColor: colors[index]
          }
        }

        let style =  StyleSheet.create(style_obj);
        interests.push(
          <View key={i} style={styles.innerInterests}>
            <View style={[style.color1, styles.interest]}>
              <Text style={styles.interestText}>{ this.state.offer.interests[i].name }</Text>
            </View>
            {
              second 
              ?
              <View key={i} style={[style.color2, styles.interest]}>
                <Text style={styles.interestText}>{ this.state.offer.interests[i + 1].name }</Text>
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

    this.business = () => {
      this.props.history.push('/businesses/' + this.state.offer.business.id);
    }

    this.toggle_edit = () => {
      this.setState({
        editing: !this.state.editing
      });
    }

    this.save = (state) => {
      if (state.description.length === 0){
        this.setState({
          form_error: 'must enter a description'
        });
        return;
      } 
      if (state.start_time === null || state.end_time === null){
        this.setState({
          form_error: 'must enter start and end time'
        });
        return;
      }

      state.start_time = moment(state.start_time, 'ddd MM/DD/YYYY hh:mm A').format();
      state.end_time = moment(state.end_time, 'ddd MM/DD/YYYY hh:mm A').format();
      // validate
      PATCH('/offers/' + this.props.match.params.id, state)
      .then((res) => {
        this.props.setOffer(this.state.offer.business.id, res);
        this.setState({
          offer: res,
          form_loading: false,
          editing: false
        });
      })
      .catch((err) => {
        console.warn(err);
        err.json().then((data) => {
          this.setState({form_error: data.error, form_loading: false})
        })
        .catch((json_err) => {
          console.warn("could not parse as json");
          console.warn(err);
          console.warn(json_err)
        });
      });

      this.setState({
        form_loading: true,
        form_error: ''
      });
    }

    this.toggle_delete = () => {
      this.setState({
        deleting: !this.state.deleting
      });
    }

    this.delete = () => {
      this.setState({
        loading: true,
        deleting: false
      });
      DELETE('/offers/' + this.props.match.params.id)
      .then(() => {
        this.props.deleteOffer(this.state.offer.business.id, this.state.offer.id);
        this.close();
      })
      .catch((err) => {
        console.warn(err);
      });
    }

    this.render_accept = () => {
      if (this.state.offer.accepted) {
        return;
      }
      return;

    }

    this.accept = () => {
      this.setState({
        loading_accept: true,
      });
      POST('/offers/'+ this.props.match.params.id + '/accept')
      .then((res) => {
        let new_offer = this.state.offer;
        new_offer.accepted = true;
        this.setState({
          loading_accept: false,
          offer: new_offer
        });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        loading: true
      });
      this.get(nextProps.match.params.id);
    }
  }
  render() {
    return (
        <HeaderView style={styles.container} history={this.props.history}>
          { this.state.editing && 
            <View style={styles.fullScreen}>
              <OfferForm
                onSave={this.save} 
                loading={this.state.form_loading}
                error={this.state.form_error}
                onClose={this.toggle_edit}
                offer={{
                  description: this.state.offer.description,
                  interests: this.state.offer.interests,
                  start_time: moment(this.state.offer.start_time).format('ddd MM/DD/YYYY hh:mm A'),
                  end_time: moment(this.state.offer.end_time).format('ddd MM/DD/YYYY hh:mm A')
                }}
              />
            </View>
          }
          { this.state.deleting && 
            <View style={styles.fullScreen}>
              <View style={styles.underlay}/>
              <View style={styles.overlay}>
                <View style={styles.modal}>
                  <Text style={styles.modalText}>Are you sure?</Text>
                  <View style={styles.buttons}>
                    <View style={styles.cancel}>
                      <TouchableHighlight 
                        onPress={this.toggle_delete} 
                        underlayColor='#AAAAAA'
                        style={styles.cancelTouch}
                      >
                          <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.delete}>
                      <TouchableHighlight 
                        onPress={this.delete} 
                        underlayColor='#AAAAAA'
                        style={styles.deleteTouch}
                      >
                          <Text style={styles.modalButtonText}>Delete</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
          <View style={styles.header}>
            <Text style={styles.headerText}>Offer</Text>
            { !this.state.loading &&
              <Icon
                containerStyle={styles.close} 
                iconStyle={styles.icon}
                name='md-arrow-back' 
                type='ionicon' 
                size={30}
                onPress={this.close}
              />
            }
            { !this.state.loading && this.state.offer.isOwner &&
              <Icon
                containerStyle={styles.edit} 
                iconStyle={styles.icon}
                name='edit' 
                type='feather' 
                onPress={this.toggle_edit}
              />
            }
          </View>
          { this.state.loading ? 
            <View style={styles.loader}>
              <ActivityIndicator size='large' color="#001f3f" />
            </View>
            :
            <View style={styles.body}>
              <View style={styles.business}>
                <Text style={styles.businessText} onPress={this.business}>
                  { this.state.offer.business.name }
                </Text>
              </View>
              <View style={styles.description}>
                <Text style={styles.descriptionText}>{ this.state.offer.description }</Text>
              </View>
              <View style={styles.time}>
                <Text style={styles.timeText}>
                  Starts: { moment(this.state.offer.start_time).format('ddd MM/DD/YYYY h:mm A') }
                </Text> 
                <Text style={styles.timeText}> 
                  Ends: { moment(this.state.offer.end_time).format('ddd MM/DD/YYYY h:mm A') }
                </Text>
              </View>
              { this.render_interests() }
              <View style={styles.accept}>
                {
                  this.state.offer.accepted 
                  ?
                  <Text style={styles.acceptedText}>
                   Show this when paying to recieve your deal!
                  </Text>
                  :
                  <Button
                    raised={!this.state.loading_accept}
                    borderRadius={5}
                    containerViewStyle={styles.acceptCont}
                    loading={this.state.loading_accept}
                    buttonStyle={styles.acceptButton}
                    textStyle={styles.acceptText}
                    title={!this.state.loading_accept ? 'Accept This Offer' : ''}
                    onPress={this.accept}
                    disabled={this.state.loading_accept}
                  />
                }
              </View>
              <View style={styles.deleteIcon}>
                <Icon 
                  name='delete' 
                  type='material-community' 
                  size={35}
                  onPress={this.toggle_delete}
                />
              </View>
            </View>
          }
        </HeaderView>
    );
  }
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setOffer,
    deleteOffer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferFull);