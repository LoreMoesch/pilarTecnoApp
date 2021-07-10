import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


export default class Profile extends React.Component {


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={{ height }}
                    source={require('../assets/images/fondo.png')}
                >

                    <View style={{ flexDirection: 'column-reverse', backgroundColor: 'rgba(0, 165, 188, 0.8)', borderRadius: 3, justifyContent: 'center' }}>

                        <Text style={styles.text}>
                            Profile
                        </Text>

                    </View>



                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        margin: width / 40,
        height: width / 8,
        width: width / 1.0,


    },

})