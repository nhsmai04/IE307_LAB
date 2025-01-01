import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/FontAwesome";
import Home from './Pages/Home';
import SettingPage from './Pages/SettingPage';

const tab = createBottomTabNavigator();
export default function Homestack() {
  return (
    
        <tab.Navigator>
            <tab.Screen name="Home" component={Home} 
             options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                ),
                
            }}
            
            />
            <tab.Screen name="Setting" component={SettingPage} 
             options={{
                tabBarLabel: "Seting",
                tabBarIcon: ({ color, size }) => (
                    <Icon name="gear" color={color} size={size} />
                ),
                
            }}
            />
        </tab.Navigator>
    
  )
}
const styles = StyleSheet.create({
    
})