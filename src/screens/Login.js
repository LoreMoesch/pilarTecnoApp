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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
//import user from '../store/reducers/user';

import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
//import { FacebookAuthProvider } from "firebase/auth";
//import { LoginManager, AccessToken } from 'react-native-fbsdk';


import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actions } from '../store';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



GoogleSignin.configure({
    webClientId: '473554681085-otfsqbnkgqrub2bdfd0njrfkfrk2qv4r.apps.googleusercontent.com',
});


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            photoURL: '',
            name: '',
            password: '',
        };
    }

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





    render() {
        const { email, photoURL, name, password } = this.state;
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={{ height }}
                    source={require('../assets/images/fondo.png')}
                >
                    <Text style={styles.text}> LOGIN </Text>
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
                                email, password ? (
                                    auth().signInWithEmailAndPassword(email, password)
                                        .then(async data => {
                                            console.log('Signed in with e-mail!');
                                            if (data) {
                                                console.log('res login: ' + JSON.stringify(data.user));
                                                try {
                                                    await AsyncStorage.setItem(
                                                        'isloged',
                                                        JSON.stringify(data.user),
                                                    );
                                                } catch (e) {
                                                    console.log('Error :' + e);
                                                }
                                                this.props.setUser(data.user);
                                            }
                                        }).catch(err => { console.log(err) })
                                ) : (
                                    Alert.alert('Incomplet!')
                                )
                            }}
                        >
                            <Text style={styles.text}>Sig In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(165, 105, 189, 0.5)' }]}
                            onPress={() => this.props.navigation.navigate('Register')}
                            style={[
                                styles.button,
                                { backgroundColor: 'rgba(165, 105, 189, 0.5)' },
                            ]}>
                            <Text style={styles.text}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(165, 105, 189, 0.5)' }]}
                            //title='Continuar con Google...'
                            onPress={() => this.onGoogleButtonPress().then(async (data) => {
                                console.log('Signed in with Google!');
                                if (data) {
                                    console.log('res login: ' + JSON.stringify(data.user));
                                    try {
                                        await AsyncStorage.setItem('isloged', JSON.stringify(data.user));   // persistencia
                                    } catch (e) {
                                        console.log('Hubo un Error!:' + e);
                                    }
                                    this.props.setUser(data.user);  // lo pasa al actions y lo guarda en el store, esto es lo que va a la pantalla de login para saber si esta logueado o no o
                                }
                            }).catch(err => { console.log(err) })

                            }
                        >
                            <Text style={styles.text}>
                                'Sig In with Google...'
                            </Text>
                        </TouchableOpacity>


                    </View>

                    <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(165, 105, 189, 0.5)' }]}
                        //title='Continuar con Facebook...'
                        onPress={() => this.onFacebookButtonPress().then(async (data) => {
                            console.log('Signed in with Facebook!');
                            if (data) {
                                //console.log('res login: ' + JSON.stringify(data.user));
                                try {
                                    await AsyncStorage.setItem('isloged', JSON.stringify(data.user));   // persistencia
                                } catch (e) {
                                    console.log('Hubo un Error!:' + e);
                                }
                                this.props.setUser(data.user);  // lo pasa al actions y lo guarda en el store, esto es lo que va a la pantalla de login para saber si esta logueado o no o
                            }
                        }).catch(err => { console.log(err) })

                        }
                    >
                        <Text style={styles.text}>
                            'Sig In with Facebook...'
                        </Text>
                    </TouchableOpacity>

                    {/* <LoginButton style={[styles.button, { backgroundColor: 'rgba(15, 105, 189, 0.5)' }]}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            console.log(data.accessToken.toString())
                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => console.log("logout.")}>

                    </LoginButton> */}


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

const mapDispatchToProps = dispatch => ({
    setUser: (data) =>
        dispatch(actions.user.setUser(data)),
})
const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)((Login))









