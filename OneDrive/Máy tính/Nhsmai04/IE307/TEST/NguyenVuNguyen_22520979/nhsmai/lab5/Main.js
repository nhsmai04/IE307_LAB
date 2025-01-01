import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/FontAwesome5";
import Placesstack from './Placesstack'
import Mediastack from './Mediastack'   
const Tab = createBottomTabNavigator()
export default function Main() {
  return (
    <NavigationContainer>
        <Tab.Navigator
        initialRouteName="Places"
        screenOptions={{
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#F8F8F8',
            tabBarStyle: {
                backgroundColor: '#633689',
            },
            tabBarLabelStyle: {
                textAlign: 'center',
            },
            tabBarIndicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        }}
        >
            <Tab.Screen name="Places" component={Placesstack} 
            options={{
                        tabBarLabel: "Places",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                        <Icon name="location-dot" color={color} size={size} />
                        ),    }}
            />
            <Tab.Screen name="Media" component={Mediastack} 
            options={{
                        tabBarLabel: "Media",
                        tabBarIcon: ({ color, size }) => (
                        <Icon name="image" color={color} size={size} />
                        ),
            }}
            
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}