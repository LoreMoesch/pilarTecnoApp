import React, { Component } from 'react';
import Posts from '../screens/Posts';
import PostDetail from '../screens/PostDetail';
import PostEdit from '../screens/PostEdit';
import PostCreate from '../screens/PostCreate';
import { createStackNavigator } from '@react-navigation/stack';

const PostStack = createStackNavigator();

export const PostsStackScreen = () => {
    return (
        <PostStack.Navigator>
            <PostStack.Screen
                name="Posts"
                component={Posts}
                options={{
                    title: 'Posts',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },

                }}
            />
            <PostStack.Screen
                name="PostDetail"
                component={PostDetail}
                options={{
                    title: 'Detail',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                }} />
            <PostStack.Screen
                name="PostEdit"
                component={PostEdit}
                options={{
                    title: 'Edit',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                }} />
            <PostStack.Screen
                name="PostCreate"
                component={PostCreate}
                options={{
                    title: 'Add Post',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                }} />
        </PostStack.Navigator>
    )
}