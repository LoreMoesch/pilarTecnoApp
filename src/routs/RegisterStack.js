import React, { Component } from 'react';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { createStackNavigator } from '@react-navigation/stack';

const RegisterStack = createStackNavigator();

export default RegisterStackScreen = (props) => {
    return (
        <RegisterStack.Navigator headerMode="none">
            <RegisterStack.Screen name="LogIn" component={Login} />
            <RegisterStack.Screen name="Register" component={Register} />
        </RegisterStack.Navigator>
    )
}