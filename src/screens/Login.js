import React, { Component, useState } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    View,
    Alert,
    Image,
    Platform,
    ScrollView
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { windowHeight } from '../utils/Dimentions';

import { Input, Icon, Divider } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actions } from '../store';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



GoogleSignin.configure({
    webClientId: '473554681085-otfsqbnkgqrub2bdfd0njrfkfrk2qv4r.apps.googleusercontent.com',
});



const Login = (props) => {


    onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // console.log('Google Credentials: '+JSON.stringify(googleCredential))

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }


    onFacebookButtonPress = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                style={{ height }}
                source={require('../assets/images/fondo.jpg')}
            >
                <Text style={styles.text}>Pilar Tecno Social App</Text>
                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText="Email"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <FormInput
                    labelValue={password}
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />

                <FormButton
                    buttonTitle="Sign In"
                    onPress={() => {
                        email, password ? (
                            auth().signInWithEmailAndPassword(email, password)
                                .then(async data => {
                                    console.log('Signed in with e-mail!');
                                    if (data) {
                                        console.log('res login: ' + JSON.stringify(data.user));
                                        try {
                                            await AsyncStorage.setItem('isloged', JSON.stringify(data.user),);
                                        } catch (e) { console.log('Error :' + e); }

                                        props.setUser(data.user);
                                    }
                                }).catch(err => { console.log(err) })
                        ) : (
                            Alert.alert('Incomplet!')
                        )
                    }}
                />

                <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                    <Text style={styles.navButtonText}>Loguearse con Redes Sociales </Text>
                </TouchableOpacity>

                <View>
                    <SocialButton
                        buttonTitle="Sign In with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => this.onGoogleButtonPress().then(async (data) => {
                            console.log('Signed in with Google!');
                            if (data) {
                                console.log('res login: ' + JSON.stringify(data.user));
                                try {
                                    await AsyncStorage.setItem('isloged', JSON.stringify(data.user));   // persistencia
                                } catch (e) {
                                    console.log('Hubo un Error!:' + e);
                                }
                                props.setUser(data.user);  // lo pasa al actions y lo guarda en el store, esto es lo que va a la pantalla de login para saber si esta logueado o no o
                            }
                        }).catch(err => { console.log(err) })

                        }
                    />

                    <SocialButton
                        buttonTitle="Sign In with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => this.onFacebookButtonPress().then(async (data) => {
                            console.log('Signed in with Facebook!');
                            if (data) {
                                //console.log('res login: ' + JSON.stringify(data.user));
                                try {
                                    await AsyncStorage.setItem('isloged', JSON.stringify(data.user));   // persistencia
                                } catch (e) {
                                    console.log('Hubo un Error!:' + e);
                                }
                                props.setUser(data.user);  // lo pasa al actions y lo guarda en el store, esto es lo que va a la pantalla de login para saber si esta logueado o no o
                            }
                        }).catch(err => { console.log(err) })

                        }

                    />
                </View>

                <TouchableOpacity style={styles.forgotButton}
                    onPress={() => props.navigation.navigate('Register')}>
                    <Text style={styles.navButtonText}>
                        No tiene cuenta? Crear aquí
                    </Text>
                </TouchableOpacity>

            </ImageBackground>
        </SafeAreaView >

    );
};



const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,

    },

    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 25,
        color: '#051d5f',
        marginTop: 5,
        marginLeft: 35,
        marginTop: 50,
        paddingTop: 80,


    },
    navButton: {
        marginTop: 15,

    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {

        fontSize: 20,
        fontWeight: '500',
        color: '#1e14e5',
        fontFamily: 'Lato-Regular',
        marginLeft: 40,
    },



});



const mapDispatchToProps = dispatch => ({
    setUser: (data) =>
        dispatch(actions.user.setUser(data)),
})
const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)((Login))









