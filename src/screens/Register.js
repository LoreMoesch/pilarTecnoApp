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




import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



GoogleSignin.configure({
    webClientId: '473554681085-otfsqbnkgqrub2bdfd0njrfkfrk2qv4r.apps.googleusercontent.com',
});



const Register = (props) => {

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


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

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

                <FormInput
                    labelValue={confirmPassword}
                    onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                    placeholderText="Confirm Password"
                    iconType="lock"
                    secureTextEntry={true}
                />



                <FormButton
                    buttonTitle="Aceptar"
                    onPress={() => {
                        password === confirmPassword ?
                            auth().createUserWithEmailAndPassword(email, password)
                                .then(() => {
                                    console.log('Usuario Creado');
                                    Alert.alert('Usuario Creado exitosamente')
                                    props.navigation.navigate('Login');
                                })
                                .catch(error => {
                                    if (error.code === 'auth/email-already-in-use') {
                                        console.log('Ya existe usuario y/o pwd');
                                        Alert.alert('Usuario existente!')
                                    }

                                    if (error.code === 'auth/invalid-email') {
                                        console.log('mail invalido');
                                        Alert.alert('e-mail invalido!')
                                    }

                                    console.error(error);
                                }) : Alert.alert('Verifique los datos nuevamente:');
                        setPassword('');
                        setConfirmPassword('')
                    }}
                />
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => { props.navigation.goBack() }}
                >
                    <Text style={styles.navButtonText}>
                        Volver
                    </Text>
                </TouchableOpacity>

            </ImageBackground >
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
        marginBottom: 1,
        color: '#051d5f',
        marginTop: 40,
        marginLeft: 35,
        marginTop: 50,
        paddingTop: 80,
        paddingBottom: 30,


    },
    navButton: {
        marginTop: 15,

    },
    forgotButton: {
        marginVertical: 55,
    },
    navButtonText: {

        fontSize: 20,
        fontWeight: '500',
        color: '#1e14e5',
        fontFamily: 'Lato-Regular',
        marginLeft: 40,
    },



});

export default Register;









