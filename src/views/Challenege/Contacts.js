import React, { Component, PropTypes,TabBarIOS } from 'react';
import Contacts from 'react-native-contacts';
//import Communications from 'react-native-communications';
import AlphabetListView from 'react-native-alphabetlistview';
import {Navigator} from 'react-native-deprecated-custom-components'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ChooseChallenger from '../../views/Challenge/ChallengerChoosePage';
import challenge from '../../views/Challenge/Challenge';

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Alert,
  Image,
  Button,
  AsyncStorage,
  Text as TextReact, Share, Modal, Keyboard, Easing, Dimensions, InteractionManager, TouchableWithoutFeedback, TouchableHighlight

} from 'react-native';
let ITEM_HEIGHT = Dimensions.get('window').height / 15;

class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = { isSelected: false,
      count: 0};
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    this.props.onSelectContact(this.props.item);
    this.setState((state) => Object.assign({}, state,{ isSelected: !this.state.isSelected }, { count: this.state.count + 1 }))
    console.log(this.state.count)
  }

  getIndicatorStyle() {
    if (this.state.isSelected) {
      return styles.IndicatorSelected;
    } else {
      return styles.Indicator;
    }
  }
  getCount(){
    return this.state.count;
  }
  getTextStyle() {
    if (this.props.textStyle) {
      return this.props.textStyle;
    }
    return styles.cellText;
  }

  getCellStyle() {
    let style = {
      justifyContent: 'center',
      paddingLeft: Dimensions.get('window').width / 10,
      flexDirection: 'row',
      height:  Dimensions.get('window').height / 20,
    };
    if (this.props.backgroundColor) {
      style.backgroundColor = this.props.backgroundColor;
    }
    return style;
  }
// THis part control view of contacts list
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.onPress()}>
          <View style={this.getCellStyle()}>

            <View style={styles.cellTextContainer}>
              <Text style={this.getTextStyle()}>{this.props.item.name}</Text>
            </View>
            <View style={styles.indicatorContainer}>
              {this.state.isSelected ? (
                <Image style={styles.captionImage} source={require('../../images/sign.png')}/>
              ) : (
                <Image style={styles.captionImage}/>
              )}
              {/*<View style={this.getIndicatorStyle()}></View>*/}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}



class SelectableContactsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      selected: [],
      contacts: [],
      phones:[],
      names:[],
      count: 0,
      count2: 0,
      status: [],
      loading2:false,

      clicked : false,
      index: 0,
      data:[],
      page:1,
      seed:1,
      error:null,
      loading:false,
      json:'',
      //    showMessage:false,
    };
  }
//For Members data

  _copyOnPress(item)  {
    var newState = true;
    this.setState({clicked:true});
  }
  onPress(item,index) {
    this.setState((state) => Object.assign({}, state,{ clicked: !this.state.clicked },));
    this.setState({index:index});
    if(this.state.clicked === true){this.setState({count2:this.state.count2-1})}
    else{this.setState({count2:this.state.count2+1})}
  }
  renderItemComponent = ({item,index}) => {
    return (
      <TouchableOpacity onPress={() => this.onPress(item,index)}>
        <View style={[styles.item,]}>
          <Text style = {styles.itemText}>{'    '} {item.name.first}{' '}{item.name.last}{'     '}</Text>
          {this.showHideCheck(index)}
        </View>
      </TouchableOpacity>
    );
  };
  showHideCheck(index){
    if(this.state.index===index && this.state.clicked) {
      return (

        <Image style={styles.captionImage} source={require('../../images/sign.png')}/>

      );
    }
    return  <Image style={styles.captionImage}/>
  }

  // makeRemoteRequest = () => {
  //   const url = `https://randomuser.me/api/?seed=10&page=1&results=20`;
  //   this.setState({ loading: true });
  //
  //   return fetch(url)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({data:responseJson.results});
  //       this.setState({json:responseJson.results[0].email});
  //       console.log(responseJson.results[0].email);
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };
  //

  // makeRemoteRequest = () => {
  //   const url = `http://localhost:8888/competitorCandidates`;
  //   this.setState({ loading: true });
  //
  //   return fetch(url)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({data:responseJson});
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };



  // sendPhones(){
  //     const url = `http://localhost:8888/challengedPhone`;
  //     this.setState({ loading: true });
  //     return fetch(url,{
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //             username: 'YangTest',
  //             phones: this.state.phones,
  //
  //         })
  //     })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         this.setState({status:responseJson});
  //       })
  //       .catch(error => {
  //         this.setState({ error, loading2: false });
  //       });
  // }
  //load member data end
  componentWillMount() {
    this.getContacts();
    //this.makeRemoteRequest();
    // this.getMember();
  }

  getContacts() {
    Contacts.getAll((err, contacts) => {
      if (err && err.type === 'permissionDenied') {
      } else {
        console.log(contacts);
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
        let groups = {};
        let phoneGroups = {};
        for (let i = 0; i < letters.length; i++) {
          groups[letters[i]] = [];
          phoneGroups[letters[i]] = [];
        }

        contacts = contacts.map(function(c) {
          let name = '';
          let phone = '';
          if (c.givenName) {
            name += (c.givenName + ' ');
          }
          if (c.familyName) {
            name += (c.familyName +' ');
          }
          c.name = name.trim();
          //c.phone = phone;
          return c;
        });

        contacts = contacts.sort(function(a, b) {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          }
          return 0;
        });

        for (let j = 0; j < contacts.length; j++) {
          let contact = contacts[j];
          let firstLetter = contact.name[0].toUpperCase();
          if (firstLetter === firstLetter.toLowerCase()) {
            groups['#'].push(contact);
            phoneGroups['#'].push(contact.phone);

          } else {
            groups[firstLetter].push(contact);
            phoneGroups[firstLetter].push(contact.phone);

          }
        }
        this.setState({ contacts: groups });
      }
    });
  }
  getPhoneNumber(contact) {
    // first try to find a mobile number, then have a chain of other defaults
    for (let i = 0; i < contact.phoneNumbers.length; i++) {
      if (contact.phoneNumbers[i].label === 'mobile') {
        return contact.phoneNumbers[i].number;
      }
    }

    for (let i = 0; i < contact.phoneNumbers.length; i++) {
      if (contact.phoneNumbers[i].label === 'home') {
        return contact.phoneNumbers[i].number;
      }
    }

    for (let i = 0; i < contact.phoneNumbers.length; i++) {
      if (contact.phoneNumbers[i].label === 'work') {
        return contact.phoneNumbers[i].number;
      }
    }

    for (let i = 0; i < contact.phoneNumbers.length; i++) {
      if (contact.phoneNumbers[i].label === 'other') {
        return contact.phoneNumbers[i].number;
      }
    }

    // if all else fails, return any number...
    if (contact.phoneNumbers && contact.phoneNumbers[0] && contact.phoneNumbers[0].number) {
      return contact.phoneNumbers[0].number;
    }

    return null;
  }
  onSelectContact(contact) {
    let selected;
    let selectedPhone;
    let currentlySelected = this.state.selected;

    let contactRemoved = currentlySelected.filter(
      s => s.recordID !== contact.recordID
    );
    if (contactRemoved.length === currentlySelected.length) {
      selected = currentlySelected;
      this.setState({count: this.state.count+1});
      selectedPhone = this.state.phones;
      selectedPhone.push(this.getPhoneNumber(contact).replace(/\D/g,''));
      this.setState({phones:selectedPhone});
      selected.push(contact);

    } else {
      selected = contactRemoved;
      this.setState({count: this.state.count-1});
      selectedPhone = this.state.phones;
      var findindex = this.getPhoneNumber(contact).replace(/\D/g,'');
      let index = selectedPhone.indexOf(findindex);

      selectedPhone.splice(0,1);
      this.setState({phones:selectedPhone});
    }
    this.setState({ selected: selected });
  }


  getCellProps() {
    var cellProps = { onSelectContact: cellsection => this.onSelectContact(cellsection)};

    if (this.props.backgroundColor) {
      cellProps.backgroundColor = this.props.backgroundColor;
    }
    if (this.props.textStyle) {
      cellProps.textStyle = this.props.textStyle;
    }
    if (this.props.indicatorColor) {
      cellProps.indicatorColor = this.props.indicatorColor;
    }
    return cellProps;
  }

  clickBack() {
    this.props.callbackfromContacts(false);
  }

  _keyExtractor = (item, index) => item.name.first;


  render() {
    return (
      <Modal
        visible={this.props.showContact}
      >
        <View style={{ flex: 1 }}>


          <View style={styles.firstView}>
            <TouchableOpacity  onPress={() => {this.clickBack()}} >
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.midTitle}>Challenge</Text>
          </View>

          <ScrollableTabView tabBarPosition='top'
                             tabBarUnderlineStyle={{backgroundColor:'#4A90E2'}}
                             tabBarBackgroundColor='#FFFFFF'
                             tabBarActiveTextColor='#4A90E2'
                             tabBarInactiveTextColor='black'
                             tabBarTextStyle={{fontSize: 18 ,fontFamily: 'AVENIR'}}
          >
            <AlphabetListView tabLabel="Friends"
                              data={this.state.contacts}
                              cell={Cell}
                              cellProps={this.getCellProps()}
                              enableEmptySections={true}
                              pageSize={50}
                              cellHeight={this.props.cellHeight || 50}
                              sectionHeaderHeight={this.props.sectionHeaderHeight || 22.5}
                              sectionListFontStyle={{fontFamily: 'AVENIR'}}
            />
            <FlatList tabLabel="Members"
                      style = {styles.list}
                      data = {this.state.data}
                      renderItem = {this.renderItemComponent}
                      ItemSeparatorComponent = { ItemDivideComponent }
                      keyExtractor = {this._keyExtractor}
                      getItemLayout = {(data,index)=>(
                        {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 1) * index, index}
                      )}

            />

          </ScrollableTabView>


          <View style={styles.thirdView}>
            <Text
              //style={styles.currentText}>{this.state.count+this.state.count2}</Text>
              style={styles.currentText}>{this.state.count}</Text>
            <TouchableOpacity onPress={
              ()=> {
                // Communications.text('3235946776','You got a challenge invitation, download populic to check details');
                // Alert.alert(
                //    // this.state.count+this.state.count2+` Invitation(s) Sent`+this.state.phones
                //     this.state.phones.toString()
                // )
                //{this.clickBack()};this.sendPhones()
                {this.clickBack()}
              }
            } >
              <Text
                style={styles.confirmText}>Send</Text>

            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    );
  }

}

class ItemDivideComponent extends Component {
  render() {

    return (
      <View style={{height: 1, backgroundColor: '#E2DEDE'}}
      />
    );
  }
};
/*SelectableContactsList.propTypes = {
    onSelectContact: PropTypes.func.isRequired,
};*/

const styles = StyleSheet.create({
  indicatorContainer: {
    flex:1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  cellTextContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  cellText: {
    fontSize: 18,
    color: 'black'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  Indicator:{
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 8,
    borderColor:'white',
  },
  IndicatorSelected:{
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 8,
    backgroundColor : '#4A90E2',
    borderColor : '#4A90E2',

  },
  cancelButton:{
    fontFamily: 'AVENIR',
    fontSize: 13,
    marginLeft: 5,
    color:'#2B16F1',
    marginTop:10,
  },
  midTitle:{
    fontFamily: 'AVENIR',
    fontSize: 20,
    marginRight: 35,
    color:'black',
    textAlign:'center',
    marginTop:8,
    flex:1,
    fontWeight:'bold',
  },
  captionText:{
    fontSize: 15,
    color:'white'
  },
  firstView: {
    backgroundColor: '#E2DEDE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems:'stretch',
    height: Dimensions.get('window').height / 16,
  },
  secondView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    //alignItems:'stretch'
    height: 30,
  },
  thirdView: {
    backgroundColor: '#E2DEDE',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems:'stretch',
    height: Dimensions.get('window').height / 18,
    //alignItems:'stretch'
  },
  currentText: {
    fontFamily: 'AVENIR',
    fontSize: 18,
    color: '#2B16F1',
    marginLeft: 25,
    marginTop:8,
  },
  confirmText: {
    fontFamily: 'AVENIR',
    fontSize: 18,
    color: '#2B16F1',
    marginRight: 25,
    marginTop:8,
  },
  textStyle:{
    fontFamily: 'AVENIR',
  },

  //
  list:{
    height: (ITEM_HEIGHT + 1) * 8 + 20,
  },
  item:{
    fontFamily: 'AVENIR',
    flexDirection:'row',
    backgroundColor: 'white',
    height:ITEM_HEIGHT,
    // justifyContent:"space-around",
    alignItems:'center',
    paddingLeft:5,
  },

  itemText:{
    fontFamily: 'AVENIR',
    fontSize: 18,
    color:'black',
    textAlign:'left',
    width:Dimensions.get('window').width * 2 / 3,
  },

});

export default SelectableContactsList;
