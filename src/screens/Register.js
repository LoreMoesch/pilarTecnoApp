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
    Alert,
    Image,
    ActivityIndicator
    //SocialButton
} from 'react-native';

import { Avatar, Input, Icon, Button, Divider } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actions } from '../store';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            photoURL: '',
            name: '',
            password: '',
        };
    }



    render() {
        const { email, photoURL, name, password } = this.state;
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={{ height }}
                    source={require('../assets/images/fondo.png')}
                >
                    <Text style={styles.text}> Register User </Text>
                    <Input style={styles.input}
                        placeholder='Email'
                        value={email}
                        leftIcon={<Icon
                            name='user-alt'
                            type='font-awesome-5'
                            size={22}
                            color='#ffff' />}
                        onChangeText={mail => this.setState({ email: mail })}
                    />

                    <Input style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        leftIcon={<Icon
                            name='lock'
                            size={22}
                            color='#ffff' />}
                        onChangeText={pass => this.setState({ email: pass })}
                    />
                    <View>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(165, 105, 189, 0.5)' }]}
                            onPress={() => {
                                auth().createUserWithEmailAndPassword(email, password)
                                    .then(() => {
                                        console.log('User account created');
                                        Alert.alert('Usuario Creado!')
                                        this.props.navigation.navigate('Login');
                                    })
                                    .catch(error => {
                                        if (error.code === 'auth/email-already-in-use') {
                                            console.log('That email address is already in use!');
                                            Alert.alert('Usuario existente!')
                                        }

                                        if (error.code === 'auth/invalid-email') {
                                            console.log('That email address is invalid!');
                                            Alert.alert('e-mail invalido!')
                                        }

                                        console.error(error);
                                        Alert.alert('Verifique los datos:',
                                            'mail valido y password: minimo 6 caracteres')
                                    });
                            }}
                        >
                            <Text style={styles.text}>Sig In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: 'rgba(165, 105, 189, 0.5)' },
                            ]}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Text style={styles.text}>Volver</Text>
                        </TouchableOpacity>
                    </View>


                </ImageBackground>
            </SafeAreaView>



        )
    }
}



const styles = StyleSheet.create({
    text: {
        margin: width / 8,
        height: width / 10,
        fontSize: 18,
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

    },
    buttonRS: {
        margin: width / 20,
        height: width / 15,
        borderRadius: 30,
        justifyContent: 'center',

    },

    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        height: width / 8,
        borderRadius: 30,


    },


})



export default Register;








