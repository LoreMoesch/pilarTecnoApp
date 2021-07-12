import React, { Component, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from './Tabs';
import Login from '../screens/Login';

const Stack = createStackNavigator();

export default AppStack = (props) => {

    let [isLoged, setIsLoged] = useState(false);
    return (
        <Stack.Navigator headerMode="none">
            {
                isLoged ? (
                    <Stack.Screen name="AppStack" component={Tabs} />
                ) : (
                    <Stack.Screen name="LogIn" component={Login} />

                )
            }
        </Stack.Navigator>
    )

}