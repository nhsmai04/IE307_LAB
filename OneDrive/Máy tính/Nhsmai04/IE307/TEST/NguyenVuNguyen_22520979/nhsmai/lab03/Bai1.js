import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components_bai1/login';
import Register from './components_bai1/register';
import Header_container from './components_bai1/header_container';
import HomeDetail from './HomeDetail';
import NotificationDetail from './components_bai1/Notification_components/NotificationDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function Bai1() {
    return (
        
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="register" component={Register} options={{ headerShown: false }}/>
                <Stack.Screen name="header_container" component={Header_container} options={{ headerShown: false }}/>
                <Stack.Screen name="HomeDetail" component={HomeDetail}  options={{ headerShown: true }}/>
                <Stack.Screen 
                 name="NotificationDetail" 
                component={NotificationDetail} 
                options={{
                headerBackTitleVisible:false,
                title: 'Thông báo'
            }}
        />
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}