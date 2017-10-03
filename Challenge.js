import React, { Component } from 'react';


import { View, Text, Image, Alert,Button, AsyncStorage,StyleSheet, Text as TextReact, Share, Modal, Keyboard, Easing, FlatList, ScrollView, Dimensions, InteractionManager, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import one from '../../views/challenge/Suggestion';
import {Navigator} from 'react-native-deprecated-custom-components'

var Challenge = React.createClass({

    getInitialState: function () {
        return { checked : this.props.initClick};
    },


    showNewsDetailView() {
        console.log('点击cell')
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
                        <Text style = {styles.timeLeftText}>8:33</Text>
                    </View>

                <View style={styles.challengeContent}>
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <Text style = {styles.captionText}>Give a hug to random person</Text>
                </View>

                <View style={styles.challengeButton} >
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <TouchableOpacity   onPress={() => {this.props.callbackParent(); navigate('Camera', {name: 'Test'}); } }>
                        <Text style={styles.btnText}> do it</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.challengeButton} >
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <TouchableOpacity   >
                        <Text style={styles.btnText}> Challenge your friend</Text>
                    </TouchableOpacity>

                </View>


                <View  style={styles.upChallengeContentCaption}>
                    <Text style={styles.captionText }> upcoming challenge</Text>
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
                <View style={styles.challengeButton} >
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <TouchableOpacity   >
                        <Text style={styles.btnText}> Submit Your Idea</Text>
                    </TouchableOpacity>

                </View>




            </View>





        );
    },

    onPress(page) {
        console.log("aaa");

            // this.props.navigator.push({
            //         component  : one
            //     }
            //
            // )
    },
});




const styles = StyleSheet.create({
    upChallengeContentCaption:{
        marginTop:50,
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
        flexDirection:'column',
    },
    upComingChallenge:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
    },
    challengeButton:{
        backgroundColor:"#5CACEE",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
        borderWidth:3,
        borderColor:"white",
        borderRadius:5,
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
        backgroundColor: "#84c1ff",
        width: Dimensions.get('window').width-(Dimensions.get('window').width)/7,
        height: Dimensions.get('window').height-(Dimensions.get('window').height)/7,
        left:(Dimensions.get('window').width)/14,
        flexDirection:'column',
        padding:30,
        borderColor: "white",
        borderWidth:3
    }
});
module.exports = Challenge;