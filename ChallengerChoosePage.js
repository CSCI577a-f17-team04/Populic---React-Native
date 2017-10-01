import React, { Component } from 'react';
import { View, Text, Image, Alert,Button, AsyncStorage,StyleSheet, Text as TextReact, Share, Modal, Keyboard, Easing, FlatList, ScrollView, Dimensions, InteractionManager, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
// import {List, ListItem } from 'react-native-elements';

var ChallengerList = require('./ChallengerList')

export default class ChooseChallenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // modalVisible: false,
            showGo:false,
            whoBeClick:'',
        };
    }

    // setModalVisible(visible){
    //     this.setState({modalVisible: visible});
    // }

    onClickPerson = (newState,who)=> {
        this.setState({showGo: newState,whoBeClick:who});

    }

    showGo(){
        if(this.state.showGo){
            return(
                <View style = {styles.footer}>
                    <View>
                        <Text style = {styles.hintName}>{this.state.whoBeClick}</Text>
                        <Text  style = {styles.hint}> will be paired with you</Text>
                    </View>
                    <View style = {{alignItems: 'center'}}>
                        <TouchableOpacity style = {{height:50,width:50}} onPress = {()=> this.clickBack()}>
                            <Image style = {{height:50,width:50} } source={require('../icons/go.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    clickBack() {
        this.setState({showGo: false,whoBeClick:''});
        // this.props.showPage = false;
        this.props.callbackParent(false);
    }

    render(){

        return(<View>
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.props.showPage}
        >

            <View style={styles.challengerPage}>
                <View style = {{alignItems: 'flex-start'}}>
                    <TouchableOpacity style = {{height:30,width:30}} onPress = {()=>this.clickBack()}>
                        <Image style = {styles.backIcon } source={require('../icons/back.png')} />
                    </TouchableOpacity>
                </View>
                <View style = {styles.header}>
                    <Image style = {styles.captionImage } source={require('../icons/challenge.png')} />
                    <Text style = {styles.headerText}>   Pick up a competitor</Text>
                </View>
                <View>
                    <ChallengerList callbackParent = {this.onClickPerson} ></ChallengerList>
                </View>
                <View style = {styles.listBottomSeparator}>
                </View>
                {this.showGo()}
            </View>
        </Modal>
        </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#44d1ff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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
    myBtnText:{
        color:"white"
    },
    // popScreenSmallBackground:{
    //     position:"relative",
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    //     flexDirection:'column',
    //     paddingTop:Dimensions.get('window').height / 4,
    //     borderWidth:3
    // },
    challengerPage:{
        position:"relative",
        backgroundColor: "#0883b1",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingTop:Dimensions.get('window').height / 20,
        flexDirection:'column',
    },
    modalBackgroundStyle:{
        backgroundColor:  'rgba(0, 0, 0, 0.75)',
    },
    captionImage:{
        width:25,
        height:30,
        alignItems: 'center',
    },
    backIcon:{
        width:30,
        height:30,
        alignItems: 'center',
    },
    hint:{
        fontWeight: 'bold',
        fontSize: 16,
        color:'#3cbadc',
        textAlign:'center',
        paddingBottom:14,
    },
    hintName:{
        fontWeight: 'bold',
        fontSize: 16,
        color:'#144655',
        textAlign:'center',
    },
    header:{
        flexDirection:'row',
        justifyContent:"center",
        paddingBottom:16,
        alignItems:'center',
        borderBottomWidth:2,
        borderColor:'skyblue',
    },
    headerText:{

        fontWeight: 'bold',
        fontSize: 16,
        color:'white',
        textAlign:'center',

    },
    listBottomSeparator:{
        borderTopWidth:2,
        borderColor:'skyblue',
    },
    footer:{
        paddingTop:Dimensions.get('window').height / 25,
        paddingBottom:20
    },

});


module.exports = ChooseChallenger;