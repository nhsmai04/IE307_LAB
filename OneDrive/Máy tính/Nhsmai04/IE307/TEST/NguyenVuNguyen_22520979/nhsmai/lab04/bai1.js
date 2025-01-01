import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/login';
import Register from './pages/register';
import Header_container from './pages/header_container';


const Stack = createNativeStackNavigator();
export default function Bai1() {
    return (
        
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="register" component={Register} options={{ headerShown: false }}/>
                <Stack.Screen name="header_container" component={Header_container} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}