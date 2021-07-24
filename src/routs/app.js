import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Tabs } from './Tabs'
import RegisterStackScreen from './RegisterStack';
import { useDispatch, useSelector } from 'react-redux';  // hooks de redux 
import Login from '../screens/Login'


const Stack = createStackNavigator();

export default AppStack = (props) => {

    const user = useSelector(state => state.user.user)  // busca un dato en el state


    return (
        <Stack.Navigator headerMode="none">
            {

                user ? (
                    <Stack.Screen name="AppStack" component={Tabs} />
                ) : (
                    <Stack.Screen name="RegisterStack" component={RegisterStackScreen} />
                )
            }
        </Stack.Navigator>
    );
};








































