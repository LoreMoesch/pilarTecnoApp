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

import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { actions } from '../store';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            photoURL: '',
            name: ''
        }
    }

    componentDidMount = () => {    //cuando se monta el componente lo saco del props del repositorio
        const { user } = this.props
        console.log('user profile: ' + JSON.stringify(user))
        this.setState({
            email: user.providerData[0].email,        // en providerData está la info del usuario
            photoURL: user.providerData[0].photoURL,
            name: user.providerData[0].displayName
        })
    }
    render() {
        const { email, photoURL, name } = this.state
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.content}>
                    <View style={{ alignItems: 'center' }}>
                        <Avatar
                            rounded
                            source={{ uri: photoURL }}
                            size='xlarge'
                        />
                        <View style={styles.dataContainer}>
                            <Text style={styles.infoText}>{email}</Text>
                            <Text style={styles.infoText}>{name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, top: 100, width: width * 0.5 }}>
                    <Button title='Salir' onPress={() => {
                        auth()
                            .signOut()
                            .then(async () => {
                                console.log('User signed out!'),
                                    this.props.setUser({ user: null })
                                try {
                                    await AsyncStorage.delItem('isloged')
                                } catch (e) {
                                    console.log('Hubo un error :' + e)
                                }
                            })
                    }} />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        // color:'#fff',
        textAlign: 'center'
    },
    content: {
        flex: 1,
        top: 50,
        justifyContent: 'center',
        // alignItems:'center'
    },
    dataContainer: {
        top: 20,
        width
    },
    infoText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'grey'
    }
})
const mapDispatchToProps = dispatch => ({
    setUser: ({ user }) =>
        dispatch(actions.user.setUser({ user })),
})
const mapStateToProps = state => ({
    user: state.user.user
})
export default connect(mapStateToProps, mapDispatchToProps)((Profile))









// import React, { Component } from 'react';
// import {
// SafeAreaView,
//     ScrollView,
//     Dimensions,
//     StatusBar,
//     StyleSheet,
//     Text,
//     ImageBackground,
//     TouchableOpacity,
//     View,
//     Alert
// } from 'react-native';

// const height = Dimensions.get('window').height
// const width = Dimensions.get('window').width


// export default class Profile extends React.Component {


//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <ImageBackground
//                     style={{ height }}
//                     source={require('../assets/images/fondo.png')}
//                 >

//                     <View style={{ flexDirection: 'column-reverse', backgroundColor: 'rgba(0, 165, 188, 0.8)', borderRadius: 3, justifyContent: 'center' }}>

//                         <Text style={styles.text}>
//                             Profile
//                         </Text>

//                     </View>



//                 </ImageBackground>
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     text: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#fff',
//         textAlign: 'center',
//         margin: width / 40,
//         height: width / 8,
//         width: width / 1.0,


//     },

// })