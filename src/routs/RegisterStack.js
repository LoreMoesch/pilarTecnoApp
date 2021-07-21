import React, { Component } from 'react';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { createStackNavigator } from '@react-navigation/stack';

const RegisterStack = createStackNavigator();

export const CreateStackScreen = () => {
    return (
        <RegisterStack.Navigator headerMode="none">
            <RegisterStack.Screen name="Login" component={Login} />
            <RegisterStack.Screen name="Create" component={Register} />
        </RegisterStack.Navigator>
    )
}