import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Tabs } from './Tabs'
import { CreateStackScreen } from './CreateStack';
import Login from '../screens/Login'
import { useDispatch, useSelector } from 'react-redux';  // hooks de redux 

const Stack = createStackNavigator();

export default AppStack = (props) => {

    const user = useSelector(state => state.user.user)  // busca un dato en el state
    let isLoadingApp = false

    return (
        <Stack.Navigator headerMode="none">
            {
                isLoadingApp ? (

                    <Stack.Screen name="LoadScreen" component={LoadScreen} />
                ) :

                    user ? (
                        <Stack.Screen name="AppStack" component={Tabs} />
                    ) : (
                        <Stack.Screen name="LogIn" component={Login} />
                    )
            }
        </Stack.Navigator>
    );
};

// const Stack = createStackNavigator();

// export default AppStack = props => {
//   const user = useSelector(state => state.user.user);
//   return (
//     <Stack.Navigator headerMode="none">
//       {user ? (
//         <Stack.Screen name="AppStack" component={Tabs} />
//       ) : (
//         <Stack.Screen name="CreateStack" component={CreateStackScreen} />
//       )}

//     </Stack.Navigator>
//   );
// };













































