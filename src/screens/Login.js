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

import { Input, Icon } from 'react-native-elements';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


export default class Map extends React.Component {


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={{ height }}
                    source={require('../assets/images/fondo.png')}
                >
                    <Text style={styles.text}> LOGIN </Text>
                    <Input style={styles.input}
                        placeholder='User'
                        leftIcon={<Icon
                            name='user-alt'
                            type='font-awesome-5'
                            size={22}
                            color='#ffff' />}
                    />

                    <Input style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        leftIcon={<Icon
                            name='lock'
                            size={22}
                            color='#ffff' />}
                    />

                    <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(165, 105, 189, 0.5)' }]}>
                        <Text style={styles.text}>
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    text: {
        margin: width / 5,
        height: width / 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFF',
        textAlign: 'center',

    },
    input: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e1e1e',
        textAlign: 'center',
        backgroundColor: '#F4ECF7',
        borderRadius: 15,
    },
    button: {
        margin: width / 15,
        height: width / 8,
        borderRadius: 30,
        justifyContent: 'center',



    }
})
