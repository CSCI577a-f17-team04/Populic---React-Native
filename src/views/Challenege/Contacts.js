import React, { Component, PropTypes,TabBarIOS } from 'react';
import Contacts from 'react-native-contacts';
//import Communications from 'react-native-communications';
import AlphabetListView from 'react-native-alphabetlistview';
import {Navigator} from 'react-native-deprecated-custom-components'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ChooseChallenger from '../../views/Challenge/ChallengerChoosePage';
import challenge from '../../views/Challenge/Challenge';
import FCM from "react-native-fcm";
import axios from 'axios';


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
      phoneList:[],
      dataUser:[],
      friendPhone:[],
      friendUsername:[],
      friendId:[],
      names:[],
      count: 0,
      count2: 0,
      status:[],
      loading2:false,
      loading3: false,
      clicked:[],
      data:[],
      loading:false,
      allContactPhones:[],
      picture: false,
      extra: false,
      test: [],
      fullname: "yang",
      nick: "yangtest",
      phone: "+13235946776",
      password: "123456",
      userToken:"",
      userNickName:"",
      nicktest: "testcontact",
      passwordtest: "123456",
      fullnametest: "Iamtest",
      phonetest: "+12137066963"
    };
  }
//For Members data



  sendPhones(){
    let date = (new Date().getMonth()+1)+"-"+(new Date().getDate())+"-"+(new Date().getFullYear());
    //const url = `http://localhost:8888/challengedPhone`;
    this.setState({ loading2: true });
    let url = `http://104.236.189.217:8888/challengedPhone`;
    console.log(this.state.phoneList+"test");

    return fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.userNickName,
        phones: this.state.phoneList,
        date:date,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({status:responseJson});
        console.log(responseJson+"test sendPhones");
      })
      .catch(error => {
        console.log(error+"test sendPhones");
        throw error;
      });
  }

   sendPN() {
    FCM.presentLocalNotification({
      vibrate: 500,
      title: 'Assassin Alert!',
      body: 'RUN!!!',
      color: '#ff0000',
      priority: "high",
      show_in_foreground: true,
      local: true,
  });
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
      selectedPhone = this.state.phoneList;
      selectedPhone.push("+1"+this.getPhoneNumber(contact).replace(/\D/g,''));
      this.setState({phoneList:selectedPhone});
      selected.push(contact);
    } else {
      selected = contactRemoved;
      this.setState({count: this.state.count-1});
      selectedPhone = this.state.phoneList;
      var findindex = "+1"+this.getPhoneNumber(contact).replace(/\D/g,'');
      let indexs = selectedPhone.indexOf(findindex);
      selectedPhone.splice(indexs,1);
      this.setState({phoneList:selectedPhone});
    }
    this.setState({ selected: selected });
  }
  findFriendsPhone(nickname){
    let phone;
    let name = this.state.friendUsername;
    let indexs = name.indexOf(nickname);
    console.log("findphone: " + indexs);
    phone = this.state.friendPhone[indexs];
    console.log("findphone: " + phone.toString())

    return phone;
  }
  onPress=(item)=>{
    const clicked = this.state.clicked;
    const index = clicked.indexOf(item);
    let selectedPhone;
    let findphone;
    this.setState({index: index});
    if (index === -1) {
      clicked.push(item);
      console.log(this.state.clicked+"yw");
      selectedPhone = this.state.phoneList;
      findphone = this.findFriendsPhone(item);
      selectedPhone.push(findphone);
      this.setState({phoneList:selectedPhone});
      this.setState({count2:this.state.count2+1});
    } else {
      clicked.splice(index, 1);
      console.log(this.state.clicked+"yw");
      selectedPhone = this.state.phoneList;
      //1. find phone number
      findphone = this.findFriendsPhone(item);
      //2. find index of this phone number
      let indexs = selectedPhone.indexOf(findphone);
      //3. delete this phone number
      selectedPhone.splice(indexs,1);
      this.setState({phoneList:selectedPhone});
      this.setState({count2:this.state.count2-1});
    }
    this.setState({ clicked });
    //   this.setState({clicked: clickedData});
  }
  selectItemPress = (item) => {

  }
  renderItemComponent = ({item,index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.onPress(item,index)}>
        <View style={[styles.item]}>
          <Text style = {styles.itemText}>{'    '} {item}{' '}</Text>
          {this.showHideCheck(item,index)}
        </View>
      </TouchableOpacity>
    );
  };

  _keyExtractor = (item, index) =>{return index;};

  isClicked = (item) => {
    return this.state.clicked.indexOf(item) !== -1;
  };
  showHideCheck = (item)=>{
    //console.log(this.state.picture+"lalla");
    if(this.isClicked(item)) {
      return (<Image style={styles.captionImage} source={require('../../images/sign.png')} />);
    }else{
      return <Image style={styles.captionImage} />
    }
  }


//Get Friends nick name, ID, and phone number
  makeRemoteRequest = () => {
    console.log("friendstest: ", this.state.userToken);// token already got
    let url = `http://52.56.146.122:3000/api/users/getFriends`;
    console.log('friendstest all phone:'+ this.state.allContactPhones);
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.state.userToken // add token here
      },
      body: JSON.stringify({

        contacts: this.state.allContactPhones
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('friendstest response:'+ responseJson.data.friends[0].username);
        this.setState({dataUser:responseJson.data});
        this.handleFriendsData(responseJson.data);

      })
      .catch(error => {
        console.log('friendstest catch:'+ error);
        throw  error
      });
  };
  handleFriendsData(dataUser){
    let friendPh = [];
    let friendName = [];
    let friendId = [];
    console.log("handleFriendsData1: called ")
    for(let i = 0; i < dataUser.friends.length; i++){
      friendPh.push(dataUser.friends[i].phone);
      console.log("handleFriendsData1: ",dataUser.friends[i].phone);
      friendName.push(dataUser.friends[i].username);
      console.log("handleFriendsData2: ", dataUser.friends[i].username);
      console.log("handleFriendsData2:  " + friendName)
      friendId.push(dataUser.friends[i].id);
      console.log("handleFriendsData3: ", dataUser.friends[i].id);
    }
    this.setState({friendUsername:friendName})
    console.log("handleFriendsData:  " + friendName)
    console.log("handleFriendsData:  " + this.state.friendUsername)
  }


// Function to get username in my page
  userNameRequest = () => {
    //const url = `http://localhost:8888/getUser`;
    console.log("userNameRequest");
    let url = `http://localhost:8888/getUser`;
    this.setState({ loading: true });

    return fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "test2"
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({status:responseJson});
        console.log(this.state.phoneList+"yw");
      })
      .catch(error => {
        throw  error
      });
  };

// function to register test account
  register(){
    console.log(this.state.nick);
    console.log(this.state.password);
    console.log(this.state.fullname);
    console.log(this.state.phone);
    // let url = 'http://52.56.146.122:3000/auth/registerUser';
    // return fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     //'Authorization': "Bearer " + this.state.userToken // add token here
    //   },
    //   body: JSON.stringify({
    //       username: this.state.nicktest,
    //       password: this.state.passwordtest,
    //       fullname: this.state.fullnametest,
    //       phone: this.state.phonetest,
    //
    //   })
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log('register response:'+ responseJson.status.msg);
    //   })
    //   .catch(error => {
    //     console.log('register catch:'+ error);
    //     throw  error
    //   });
    axios.post('http://52.56.146.122:3000/api/auth/registerUser', {
      headers: {
        'Content-Type': 'application/json',
    },
      data:{
      // username: this.state.nick,
      // password: this.state.password,
      // fullname: this.state.fullname,
      // phone: this.state.phone
      username: "testcontact",
      password: "123456",
      fullname: "Iamtest",
      phone: "+12137066963"
    }})
      .then(function (response) {
        console.log("User registered: ", response);
      })
      .catch(function (error) {
        console.log("Could not register user: ", error);
      });
  }

  // function to login and get token.
  loginUser = () => {
    axios.post('http://52.56.146.122:3000/api/auth/authUser', {
      username: this.state.nick,
      password: this.state.password
    })
      .then((response) => {
        console.log("login: check response ", response);
        if (response.data.status.status === 'success') {
          this.setState({userToken:response.data.data.token, userNickName:response.data.data.user.username},
            function(){
            this.makeRemoteRequest();
          })
          console.log("longin: ID: ", this.state.userToken);
          console.log("longin: ID: ", this.state.userNickName);

        } else if (response.data.status.status === 'error') {
          alert("login: Wrong username or password.");
        }
      })
      .catch(function (error) {
        console.log("login: Could not log in: ", error);
      });
  }

  componentWillMount() {
    this.getContacts();
    //this.register();
    //this.userNameRequest();
    this.loginUser();
    //this.makeRemoteRequest();

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
  getContacts() {
    Contacts.getAll((err, contacts) => {
      if (err && err.type === 'permissionDenied') {
      } else {
        console.log(contacts);
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
        let groups = {};
        let phoneGroups = {};
        let allPhones = [];
        for (let i = 0; i < letters.length; i++) {
          groups[letters[i]] = [];
          phoneGroups[letters[i]] = [];
        }

        contacts = contacts.map(function (c) {
          let name = '';
          let phone = '';
          if (c.givenName) {
            name += (c.givenName + ' ');
          }
          if (c.familyName) {
            name += (c.familyName + ' ');
          }
          c.name = name.trim();
          //c.phone = phone;
          return c;
        });

        contacts = contacts.sort(function (a, b) {
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
            allPhones = this.state.allContactPhones;
            allPhones.push('+1' + this.getPhoneNumber(contact).replace(/\D/g, ''));
          }
        }
        allPhones.push('+358469630138');
        allPhones.push('+358469630137');

        this.setState({contacts: groups});
        this.setState({allContactPhones: allPhones});
      }
    });
  }



  resetCount(){
    this.setState ({
      isSelected: false,
      selected: [],
      phoneList:[],
      names:[],
      count: 0,
      count2: 0,
      status: [],
      loading:false,
      loading2:false,
      loading3:false,
      clicked:[],
      //    showMessage:false,
    });
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
    this.props.updateDate();
    this.props.callbackfromContacts(false);

  }




  render() {
    console.log("contact list render: "+ this.state.friendUsername)
    return (
      <Modal
        visible={this.props.showContact}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.firstView}>
            <TouchableOpacity  onPress={() => {this.clickBack(), this.resetCount()}} >
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
            <FlatList tabLabel="Friends"
                      style = {styles.list}
                      data = {this.state.friendUsername}
                      extraData={this.state}
                      keyExtractor = {this._keyExtractor}
                      renderItem = {this.renderItemComponent}
                      ItemSeparatorComponent = { ItemDivideComponent }

            />

            <AlphabetListView tabLabel="Contacts"
                              data={this.state.contacts}
                              cell={Cell}
                              cellProps={this.getCellProps()}
                              enableEmptySections={true}
                              pageSize={50}
                              cellHeight={this.props.cellHeight || 50}
                              sectionHeaderHeight={this.props.sectionHeaderHeight || 22.5}
                              sectionListFontStyle={{fontFamily: 'AVENIR'}}

            />
          </ScrollableTabView>
          <View style={styles.thirdView}>
            <Text
              //style={styles.currentText}>{this.state.count+this.state.count2}</Text>
              style={styles.currentText}>{this.state.count+this.state.count2}</Text>
            <TouchableOpacity onPress={
              ()=> {
                 // Alert.alert(
                 //   //this.state.count+this.state.count2+` Invitation(s) Sent`+this.state.phones
                 //   //this.state.phoneList.toString()
                 //   this.state.allContactPhones.toString()
                 // )
                {this.sendPhones()};
                {this.clickBack()};
                {this.resetCount()};
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
      <View style={{
        height: 1,
        backgroundColor: '#E2DEDE',
        paddingLeft: 5,
        paddingRight: 5,}}
      />
    );
  }
};

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
    //fontFamily: 'AVENIR',
    flexDirection:'row',
    //backgroundColor: 'white',
    height:ITEM_HEIGHT,
    // justifyContent:"space-around",
    alignItems:'center',
    paddingLeft:5,
    flex:1
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
