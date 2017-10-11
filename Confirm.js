import React, { Component } from 'react';
import { View, Text, Navigator, StatusBar,Image,StyleSheet, Button, TouchableOpacity,TouchableHighlight,Modal } from 'react-native';

import NavigationBar from 'react-native-navbar';
import SettingsList from 'react-native-settings-list';
import Challenge from '../../views/challenge/Challenge';


export default class App extends Component {

  constructor(props){
    super(props);
    // this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: true};
  }

  render() {
    // const {goBack} = this.props.navigation;
    // const { navigate } = this.props.navigation;
    const doneConfig = {
      title: 'Done',
      tintColor: '#4da6ff',
      handler: () => goBack(),
    };

    return (<View>
        <Modal
            animationType={'fade'}
            visible={this.props.showConfirm}
        >
      <View style={{backgroundColor: 'white', flex: 1}}>



           {/*<Text tyle={{color: 'red'} }> Hello world!</Text>*/}
            <Image source={require('../../images/joe.png')} style={styles.container} >
                {/*<TouchableOpacity  onPress={() => { navigate('Map', {name: 'Testconfirm'}); }} >*/}
                {/*<view style={{width: 80, height: 80,}}>*/}
                    {/*<Text style={  color ='white'} >*/}
                        {/*Trojans!*/}
                    {/*</Text>*/}
                {/*/!*</TouchableOpacity>*!/*/}
                {/*</view>*/}

                <TouchableHighlight onPress={() => {  }}>
                    <View style={{flexDirection:'row', alignItems: 'center',}}>
                        <Image
                            source={require('../../images/back.png')}
                        />
                        <Text style={{color: 'white' , fontWeight: '500',fontSize:30}}>Trojans</Text>
                        <Text style={{color: 'white' ,fontSize:12,top:25,left:-100}}>maggietr | 9h ago</Text>
                    </View>
                </TouchableHighlight>

                {/*<Image source={require('../../images/sticker.png')} style={{width: 40, height: 40,top:200,left:40}}  >*/}

                {/*</Image>*/}
              <TouchableOpacity  onPress={() => { }} style={{width: 80, height: 80,left:250, top: 530}}>
                <Image source={require('../../images/approve.png')} style={{width: 80, height: 80,}}  >

                </Image>

              </TouchableOpacity>

              <TouchableOpacity  onPress={() => {  }} style={{width: 80, height: 80,left:60, top: 450}}>
                  <Image source={require('../../images/decline.png')} style={{width: 80, height: 80 }}  >
                  </Image>
              </TouchableOpacity>


        </Image>

        {/*</View>*/}
      </View>
        </Modal>
        </View>
    )
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
    }
})


