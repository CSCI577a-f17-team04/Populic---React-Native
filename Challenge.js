import React, { Component } from 'react';

import { View, Text, Image, Alert,Button, AsyncStorage,StyleSheet, Text as TextReact, Share, Modal, Keyboard, Easing, FlatList, ScrollView, Dimensions, InteractionManager, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import one from '../../views/challenge/Suggestion';
import {Navigator} from 'react-native-deprecated-custom-components'
import ContactList from '../../views/challenge/Contacts';
import ChooseChallenger from '../../views/challenge/ChallengerChoosePage';
import App from '../../views/challenge/Settings';

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
            showConfirm: false,
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
        setInterval(()=>this.getSec(),1000);
        setInterval(()=>this.getMin(),1000);
        setInterval(()=>this.getHours(),1000);
    },

    setModalVisible(visible){
        this.setState({modalVisible: visible});
    },

    setContactVisible(visible){
        this.setState({contactVisible: visible});
    },

    showChallengers(){

        const { navigate } = this.props.navigation;
        //const { callback1 } = this.props.callbackParent;
        if(!this.state.isGameOn) {
            return (

                    <View>
                        <TouchableOpacity style={styles.submitButton}
                          onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            <Image style={styles.captionImage} source={require('../../images/pin.png')}/>
                          <Text style={styles.btnText}> 4 challengers</Text>
                        </TouchableOpacity>
                        <View style={styles.submitButton} >
                            <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                            <TouchableOpacity  onPress={() => {this.setContactVisible(!this.state.contactVisible)} } >
                            <Text style={styles.btnText}> Challenge your friend</Text>
                        </TouchableOpacity>
                            <ContactList callbackfromContacts = {this.setContactVisible} showContact = {this.state.contactVisible} ></ContactList>
                        </View>
                    </View>
            );
        }else{
            return(
             <View>
                <View style = {styles.challengersContent}>
                    <View style = {styles.challengersOne}>
                        <TouchableOpacity>
                            <Text style = {styles.captionText}> Annie </Text>
                                <View style = {styles.verification}>
                                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                                    <Text style = {styles.timeLeftText}>{this.state.hour + " : "+this.state.minute +" : " +this.state.second}
                                    </Text>
                                </View>
                       </TouchableOpacity> 
                    </View>

                    <View style = {styles.challengersLine}></View>
                        <View style = {styles.challengersTwo}>
                            <TouchableOpacity onPress={() => { this.setState({showConfirm:true}) }}>
                                <Text style = {styles.captionText}> Jason </Text>
                                    <View style = {styles.verification}>
                                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                                        <Text style = {styles.timeLeftText}>{this.state.hour + " : "+this.state.minute +" : " +this.state.second}
                                        </Text>
                                    </View>
                            </TouchableOpacity> 
                        </View>
                    </View>
                   
                   <View style={styles.challengeButton} >
                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                            <TouchableOpacity>
                                <Text style={styles.captionText}> DO IT</Text>
                        </TouchableOpacity>
                   </View>
                </View>
            );
        }
    },

    setGameOn(){
        this.setState({isGameOn:true});
    },

    render(){
        const { navigate } = this.props.navigation;
        const { callback1 } = this.props.callbackParent;
        return(

            <View style={styles.popScreen}>

                <View style = {styles.caption}>
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <Text style = {styles.captionText}>USC Daily Challenge</Text>
                </View>

                <View style={styles.timeLeft}>
                    <Text style = {styles.timeLeftText}>{this.state.hour + " : "+this.state.minute +" : " +this.state.second}
                    </Text>
                </View>

                <View style={styles.challengeContent}>
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <Text style = {styles.captionText}>Give a hug to random person</Text>
                </View>

                {this.showChallengers()}


                <View  style={styles.upChallengeContentCaption}>
                    <Text style={styles.captionText }> Upcoming Challenge</Text>
                </View>
                <View style={styles.upComingChallenge} >

                    <View style={styles.upChallengeContent}>
                        <Text style={styles.textProperty }> Eat banana in 7 second</Text>
                        <Text style={styles.textProperty }> shotgun a beer</Text>
                    </View>

                    <View style={styles.upChallengeContent}>
                        <Text style={styles.textProperty }> Eat banana in 7 second</Text>
                        <Text style={ styles.textProperty }> shotgun a beer</Text>
                    </View>

                </View>
                <View style={styles.submitButton} >
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <TouchableOpacity   >
                        <Text style={styles.btnText}> Submit Your Idea</Text>
                    </TouchableOpacity>

                </View>

                <ChooseChallenger callbackParent = {this.setModalVisible} showPage = {this.state.modalVisible} gameOn = {this.setGameOn}/>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.showConfirm}
                >
                    <App></App>
                </Modal>
            </View>
        );
    },

});

const styles = StyleSheet.create({
    upChallengeContentCaption:{
        marginTop:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        top: 40,
                                 
    },
   

    challengeStatue:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
    },
    challengeStatueText:{
        fontSize: 15,
        color:'#83E027',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
    },
    buttonStyle:{
        borderWidth:3,
        borderColor:"white",
        backgroundColor: "#5CACEE"
    },
    timeLeftText:{
        fontSize: 15,
        color:'white'
    },
    captionText:{
        fontSize: 15,
        color:'white'
    },
    textProperty:{
        fontSize: 10,
        margin:5,
        color:'white'
    },
    upChallengeContent:{
        top: 40,
        flexDirection:'column',
    },
    upComingChallenge:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
    },
   submitButton:{
   backgroundColor:"#277DE0",
   flexDirection:'row',
   alignItems:'center',
   justifyContent:"center",
   margin:10,
   borderWidth:2,
   borderColor:"white",
   borderRadius:5,
   padding:8,
   top:80,
   paddingVertical: 5,
   paddingRight:1,
   paddingLeft:1,
   },
                                 
   challengeContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
    },
    timeLeft:{
        alignItems:"flex-end",
        margin: 10,
    },
    captionImage:{
        width:15,
        height:15
    },
    caption:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin: 10,

    },
    popScreen:{
        position:"relative",
        backgroundColor: "#4AA0DF",
        width: Dimensions.get('window').width-(Dimensions.get('window').width)/7,
        height: Dimensions.get('window').height-(Dimensions.get('window').height)/7,
        left:(Dimensions.get('window').width)/14,
        flexDirection:'column',
        padding:30,
        borderColor: "white",
        borderWidth:3,
        top:30,
        zIndex:-1,
    },
    popScreenSmallBackground:{
        position:"relative",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection:'column',
        paddingTop:Dimensions.get('window').height / 4,
        borderWidth:3
    },
    popScreenSmall:{
        position:"relative",
        backgroundColor: "#0883b1",
        width: Dimensions.get('window').width - Dimensions.get('window').width / 6,
        height: Dimensions.get('window').height / 4,
        left:(Dimensions.get('window').width)/12,
        flexDirection:'column',
        borderColor: "white",
        borderWidth:3
    },
     challengeButton:{
     backgroundColor:"#83E027",
     flexDirection:'row',
     alignItems:'center',
     justifyContent:"center",
     margin:10,
     borderWidth:2,
     paddingVertical: 8,
     paddingRight: 1,
     paddingLeft: 1,
     borderColor:"white",
     borderRadius:5,
     padding:5,
     top: 100
     },
    challengersButton:{
        backgroundColor:"#08709e",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
        borderWidth:3,
        borderColor:"white",
        borderRadius:5,
    },
    btnText:{
        color:"white"
    },
    modalBackgroundStyle:{
        backgroundColor:  'rgba(0, 0, 0, 0.75)',
    },
    challengersContent:{
        flexDirection:'row',

    },
    challengersOne:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:"center",
        position: "absolute"

    },
    challengersLine:{

        left: 120,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        borderColor:"white",
        borderWidth: 1,
        paddingTop: 60,
        paddingBottom: 40,
        position: "absolute"
    },
    challengersTwo:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:"center",
        left: 200,
        position: "absolute"
    },
   verification:{
   flexDirection:'row',
   },
                                 




});
module.exports = Challenge;
