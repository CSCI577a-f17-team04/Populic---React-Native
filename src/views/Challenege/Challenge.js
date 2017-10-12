import React, { Component } from 'react';

import { View, Text, Image, Alert,Button, AsyncStorage,StyleSheet, Text as TextReact, Share, Modal, Keyboard, Easing, FlatList, ScrollView, Dimensions, InteractionManager, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import one from '../../views/challenge/Suggestion';
import {Navigator} from 'react-native-deprecated-custom-components'
import ContactList from '../../views/challenge/Contacts';
import ChooseChallenger from '../../views/challenge/ChallengerChoosePage';
import App from '../../views/challenge/Settings';

// const challengeIcon = '../../images/lace-2.png';

var timer1 = null;
var timer2 = null;
var timer3 = null;

var Challenge = React.createClass({



    getInitialState: function () {
        return {
            checked : this.props.initClick,
            showCancel: false,
            modalVisible: false,
            isGameOn: false,
            contactVisible: false,
            hour : (23 - new Date().getHours()),
            minute : (59 - new Date().getMinutes()),
            second : (59 - new Date().getSeconds()),
            completeTime: [],
            showConfirm: false,
            doItVisible: true,
            isConfirm: false,
            isDeclineOther: false,
        };
    },

    showNewsDetailView() {
        console.log('点击cell')
    },

    getHours(){
        h = (23 - new Date().getHours());
        this.setState({hour:h});
    },

    getMin(){
        min = (59 - new Date().getMinutes());
        this.setState({minute:min});
    },

    getSec(){
        sec = (59 - new Date().getSeconds());
        this.setState({second:sec});
    },

    componentDidMount(){
        timer1 = setInterval(()=>this.getSec(),1000);
        timer2 = setInterval(()=>this.getMin(),1000);
        timer3 = setInterval(()=>this.getHours(),1000);
    },

    componentWillUnmount(){
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
    },


        setModalVisible(visible){
        this.setState({modalVisible: visible});
    },

    setContactVisible(visible){
        this.setState({contactVisible: visible});
    },

    setDoItVisible(visible){
        this.setState({doItVisible: visible});
    },

    showDoIt(){
      if(this.state.doItVisible && !this.state.isDeclineOther){
          return(
              <View style={{marginTop: 10}}>
                  <TouchableOpacity style={styles.challengeButton}
                                    onPress={() => {this.clickDoIt()}}>
                      <Image style={styles.captionImage} source={require('../../images/lace-2.png')}/>
                      <Text style={styles.btnText}> Do It</Text>
                  </TouchableOpacity>
              </View>
          );
      }
    },

    clickDoIt(){
        time = [];
        time[0] = new Date().getHours();
        time[1] =  new Date().getMinutes();
        time[2] =  new Date().getSeconds();
        this.setState({completeTime:time});
        this.setDoItVisible(!this.state.doItVisible);
    },

    showToConfirm(){
        if (!this.state.isConfirm && !this.state.isDeclineOther) {
            return (
                <View>
                    <View style={styles.verification}>
                        <Text style={styles.verifyTextRight}> Waiting for Verification</Text>
                    </View>
                    <View style={styles.verification}>
                        <TouchableOpacity
                            style={{paddingTop: 20}}
                            onPress={() => {
                                this.setState({showConfirm: true})
                            }}>
                            <Text style={styles.verifyTextRight}>Go to Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    },

    showWaitConfirm() {
        if (!this.state.doItVisible && !this.state.isConfirm && !this.state.isDeclineOther) {
            return (
                <View>
                    <View style={styles.verification}>
                        <Image style={styles.captionImage} source={require('../../images/lace-2.png')}/>
                        <Text
                            style={styles.timeLeftText}>{this.showFixTime()}
                        </Text>
                    </View>
                    {this.showToConfirm()}
                </View>
            );
        } else if(this.state.isConfirm){
            return (
                <View style={styles.verification}>
                    <Image style={styles.captionImage} source={require('../../images/lace-2.png')}/>
                    <Text
                        style={styles.timeLeftText}>{this.showFixTime()}
                    </Text>
                    <Image style={styles.captionImage} source={require('../../images/checked-box.png')}/>
                </View>
            );
        }
    },

    showWaitConfirm2() {
        if (!this.state.doItVisible) {
            return (
                <View>
                    <View style={styles.verification}>
                        <Image style={styles.captionImage} source={require('../../images/lace-2.png')}/>
                        <Text
                            style={styles.timeLeftText}>{this.showFixTime2()}
                        </Text>
                    </View>
                    <View style={styles.verification}>
                        <Text style={styles.verifyTextRight}> Waiting for Verification</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View/>
            );
        }
    },

    showChallengers() {

        if (!this.state.isGameOn) {
            return (
                <View style={styles.GameOff}>
                    <TouchableOpacity style={styles.submitButton}
                                      onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                        <Text style={styles.btnText}> View Challengers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={() => {
                            this.setContactVisible(!this.state.contactVisible)
                        }}>
                            <Image style={styles.captionImage} source={require('../../images/lace-2.png')}/>
                            <Text style={styles.btnText}> Challenge Your Friends</Text>
                    </TouchableOpacity>
                    <ContactList callbackfromContacts={this.setContactVisible}
                                     showContact={this.state.contactVisible}/>

                </View>
            );
        } else {
            return (
                <View style={styles.GameOn}>

                        <View style={styles.challengersContent}>
                            <View style={styles.challengersOne}>
                                <Text style={styles.subCaptionText}> You </Text>
                                <View style = {{height : 100}}>
                                {this.showWaitConfirm2()}
                                </View>
                                <Text style={styles.scoreText}> 0 p </Text>
                            </View>

                            <View style={styles.challengersLine}/>

                            <View style={styles.challengersTwo}>
                                <Text style={styles.subCaptionText}> Jason </Text>
                                <View style = {{height : 100}}>
                                {this.showWaitConfirm()}
                                </View>
                                {this.showScore()}
                            </View>
                        </View>

                    {this.showDoIt()}

                </View>
            );
        }
    },

    showScore(){
        if(this.state.isConfirm) {
            return (
                <Text style={styles.scoreText2}> +400 p </Text>
            );
        }else{
            return(
                <Text style={styles.scoreText}> 0 p </Text>
            );
        }
    },

    setGameOn(){
        this.setState({isGameOn:true});
    },

    hideConfirm(){
        this.setState({showConfirm:false});
    },

    showTime(){
        var comma1,comma2;

        if(this.state.minute < 10){
            comma1 = ':0';
        }else {
            comma1 = ':';
        }

        if(this.state.second < 10){
            comma2 = ':0';
        }else {
            comma2 = ':';
        }

        return(this.state.hour + comma1 + this.state.minute + comma2 + this.state.second);
    },

    showFixTime(){
        var comma1,comma2;
        ct = this.state.completeTime;

        if(ct[1] < 10){
            comma1 = ':0';
        }else {
            comma1 = ':';
        }

        if(ct[2] < 10){
            comma2 = ':0';
        }else {
            comma2 = ':';
        }
        return(ct[0] + comma1 + ct[1] + comma2 + ct[2]);
    },

    showFixTime2(){
        var comma1,comma2;
        ct = this.state.completeTime;
        ct2 = [];
        s = ct[2] + 8;
        m = ct[1] + 15;
        h = ct[0];

        if(s > 59){
            ct2[2] = s - 60 ;
            m = m + 1;
        }else{
            ct2[2] = s;
        }

        if(m > 59){
            ct2[1] = m - 60 ;
            h = h + 1;
        }else{
            ct2[1] = m;
        }
        ct2[0] = h;

        if(ct2[1] < 10){
            comma1 = ':0';
        }else {
            comma1 = ':';
        }

        if(ct2[2] < 10){
            comma2 = ':0';
        }else {
            comma2 = ':';
        }
        return(ct2[0] + comma1 + ct2[1] + comma2 + ct2[2]);
    },

    setConfirm(){
        this.setState({isConfirm:true});
    },

    setDecline(){
        this.setState({isDeclineOther:true});
    },

    render: function () {
        const {navigate} = this.props.navigation;
        const {callback1} = this.props.callbackParent;
        return (

            <View style={styles.popScreen}>

                <View style={styles.caption}>
                    <Image style={styles.captionImageHead} source={require('../../images/lace-2.png')}/>
                    <Text style={styles.captionText}>{' '}USC Daily Challenge</Text>
                </View>

                <View style={styles.timeLeft}>
                    <Text
                        style={styles.timeLeftText}>{this.showTime()}
                    </Text>
                </View>

                <View style={{alignItems:'center'}}>
                    <Text style={styles.subCaptionText}>Give a hug to random person</Text>
                </View>

                {this.showChallengers()}

                <View>
                    <View style={styles.upChallengeContentCaption}>
                        <Text style={styles.subCaptionText}> Upcoming Challenges</Text>
                    </View>
                    <View style={styles.upComingChallenge}>

                        <View style={styles.upChallengeContent}>
                            <Text style={styles.textProperty}> Eat banana in 7 seconds</Text>
                            <Text style={styles.textProperty}> Scare your roommate</Text>
                        </View>

                        <View style={styles.upChallengeContent}>
                            <Text style={styles.textProperty}> Shotgun a beer</Text>
                            <Text style={styles.textProperty}> Ask cashier’s number at Village Dining hall</Text>
                        </View>

                    </View>
                    {/*<View style = {{alignItems:'center'}}>*/}
                        {/*<TouchableOpacity style={styles.submitButton}>*/}
                            {/*<Text style={styles.btnText}> Submit Your Idea</Text>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </View>

                <ChooseChallenger callbackParent={this.setModalVisible} showPage={this.state.modalVisible}
                                  gameOn={this.setGameOn}/>
                {/*<View>*/}
                    {/*<Modal*/}
                        {/*animationType={'fade'}*/}
                        {/*transparent={true}*/}
                        {/*visible={this.state.showConfirm}*/}
                     {/*>*/}
                        <App show={this.hideConfirm} confirm={this.setConfirm} decline = {this.setDecline} visible={this.state.showConfirm}/>
                    {/*</Modal>*/}
                {/*</View>*/}
            </View>
        );
    },

});

const styles = StyleSheet.create({
    upChallengeContentCaption:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    challengeStatue:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    buttonStyle:{
        borderWidth:3,
        borderColor:'white',
        backgroundColor: '#5CACEE'
    },
    timeLeftText:{
        fontSize: 15,
        color:'white',
    },
    captionText:{
        fontSize: 22,
        color:'white',
    },
    subCaptionText:{
        fontSize: 18,
        color:'white',
    },
    scoreText:{
        fontSize: 18,
        color:'red',
        fontWeight: 'bold',
    },
    scoreText2:{
        fontSize: 18,
        color:'#83E027',
        fontWeight: 'bold',
    },
    textProperty:{
        fontSize: 14,
        margin:5,
        color:'white'
    },
    upChallengeContent:{
        width: Dimensions.get('window').width *2.9 / 7,
        alignItems:'stretch',
        justifyContent:'center',
    },
    upComingChallenge:{

        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center',
        width:Dimensions.get('window').width * 5 / 6 - 5,
        margin:10,
        marginLeft:0,
    },
   submitButton:{
        backgroundColor:'#277DE0',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        borderWidth:2,
        borderColor:'white',
        borderRadius:5,
        padding:8,
        paddingVertical: 5,
        paddingRight:1,
        paddingLeft:1,
        width:240,
   },
                                 
   challengeContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        margin:10,
    },
    timeLeft:{
        alignItems:'flex-end',
        margin: 10,
    },
    captionImage:{
        width:15,
        height:15,
    },
    captionImageHead:{
        width:25,
        height:25,
    },
    caption:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin: 10,

    },
    popScreen:{
        position:'relative',
        backgroundColor: '#4AA0DF',
        width: Dimensions.get('window').width-(Dimensions.get('window').width)/7,
        height: Dimensions.get('window').height-(Dimensions.get('window').height)/7,
        left:(Dimensions.get('window').width)/14,
        flexDirection:'column',
        paddingTop:30,
        paddingBottom:30,
        borderColor: 'white',
        borderWidth:3,
        top:30,
        zIndex:-1,
    },
    popScreenSmallBackground:{
        position:'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection:'column',
        paddingTop:Dimensions.get('window').height / 4,
        borderWidth:3
    },
    popScreenSmall:{
        position:'relative',
        backgroundColor: '#0883b1',
        width: Dimensions.get('window').width * 5 / 6,
        height: Dimensions.get('window').height / 4,
        left:(Dimensions.get('window').width)/12,
        flexDirection:'column',
        borderColor: 'white',
        borderWidth:3
    },
    challengeButton:{
        backgroundColor:'#83E027',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        borderWidth:2,
        paddingVertical: 8,
        paddingRight: 1,
        paddingLeft: 1,
        borderColor:'white',
        borderRadius:5,
        padding:5,
        width:240,

     },
    challengersButton:{
        backgroundColor:'#08709e',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        borderWidth:3,
        borderColor:'white',
        borderRadius:5,
    },
    btnText:{
        color:'white'
    },
    modalBackgroundStyle:{
        backgroundColor:  'rgba(0, 0, 0, 0.75)',
    },
    challengersContent:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    challengersOne:{
        alignItems:'center',
        justifyContent:'flex-start',
        width: Dimensions.get('window').width *2 / 5,

    },
    challengersLine:{
        borderColor:'white',
        borderWidth: 1,
        paddingBottom: 140,
    },
    challengersTwo:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        width: Dimensions.get('window').width *2 / 5,
    },
   verification:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'center',
   },
    verifyTextLeft:{
        fontSize: 12,
        // flexDirection: 'row',
        // right:15,
        // alignItems:'center',
        // justifyContent:'center',
        color:'#40FB1B'

    },
    verifyTextRight:{
        fontSize: 14,
        // flexDirection: 'row',
        // right:40,
        alignItems:'center',
        justifyContent:'center',
        color:'#40FB1B',

    },
    GameOff:{
        paddingTop: Dimensions.get('window').height / 30,
        paddingBottom: Dimensions.get('window').height / 30,
        height:Dimensions.get('window').height*2 / 7 + 40,
        alignItems:'center',
    },
    GameOn:{
        paddingTop: Dimensions.get('window').height / 30,
        paddingBottom: Dimensions.get('window').height / 30,
        height:Dimensions.get('window').height*2 / 7 + 40,
        alignItems:'center',
    }




});
module.exports = Challenge;
