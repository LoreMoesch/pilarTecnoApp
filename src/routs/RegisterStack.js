import React, { Component } from 'react';
import { View } from 'react-native';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { createStackNavigator } from '@react-navigation/stack';


const RegisterStack = createStackNavigator();

export default RegisterStackScreen = (props) => {
    return (
        <RegisterStack.Navigator headerMode="none">
            <RegisterStack.Screen name="LogIn" component={Login} />
            <RegisterStack.Screen name="Register" component={Register}
                options={({ navigation }) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <FontAwesome.Button
                                name="long-arrow-left"
                                size={25}
                                backgroundColor="#f9fafd"
                                color="#333"
                                onPress={() => navigation.navigate('LogIn')}
                            />
                        </View>
                    ),
                })}
            />
        </RegisterStack.Navigator>
    )
}