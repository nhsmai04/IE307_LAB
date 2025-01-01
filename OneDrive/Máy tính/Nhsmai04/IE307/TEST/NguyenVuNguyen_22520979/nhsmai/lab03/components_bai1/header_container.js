import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/FontAwesome";

import Home from './Home.js';
import Categories from './Categories.js';
import Favourites from './Favourites.js';
import Profile from './Profile.js';
import Notification from './Notification.js';
import Help from './Help.js';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const  TabNavigator = () =>{
   return(
    <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            
          }}
          component={Home} />
        <Drawer.Screen
          name="Notifications"
          options={{
            drawerLabel: 'Notifications',
            title: 'Notifications',
            
          }}
          component={Notification} />
          <Drawer.Screen
          name="Help"
          options={{
            drawerLabel: 'Help',
            title: 'Help'
          }}
          component={Help} />
      </Drawer.Navigator>
)
}
export default function Header_container() {
    return (
        
<Tab.Navigator
initialRouteName="Home"
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
<Tab.Screen
    name="Home"
    component={TabNavigator}
    options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
        ),
        
    }}
    
/>
<Tab.Screen
    name="Categories"
    component={Categories}
    options={{
        tabBarLabel: "Categories",
        tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
        ),
    }}
/>
<Tab.Screen
    name="Favourites"
    component={Favourites}
    options={{
        tabBarLabel: "Favourites",
        tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
        ),
        tabBarBadge:3
    }}
/>
<Tab.Screen
    name="Profile"
    component={Profile}
    options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
        ),
    }}
 />
</Tab.Navigator>   
        
    );
}
