import React, { Component, useState, useEffect, navigationRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  StyleSheet,

} from 'react-native';

import AppStack from '../routs/app';
import { NavigationContainer } from '@react-navigation/native';
import { store, actions } from '../store';
import auth from '@react-native-firebase/auth';
import { useDispatch, Provider } from 'react-redux';




const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const App = (props) => {

  let AppWrapped = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const dispatch = useDispatch()

    // Handle user state changes
    async function onAuthStateChanged(user) {
      if (user) {
        setUser(user)
      } else {
        dispatch(actions.user.setUser(null))
      }
      if (initializing) setInitializing(false);
    }


    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);   //le coloco [] para que el usseffect no se convierta en un bucle infinito, y solo ejecute la primeva vez buscando autenticacion usuario

    if (initializing) { return null; }

    return (
      <NavigationContainer ref={navigationRef}>
        <AppStack />
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <AppWrapped />
    </Provider>
  );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  },
  button: {
    margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1
  }
})

export default App;