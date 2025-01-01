import { View, Text } from 'react-native'
import React,{useContext} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homestack from './components_bai2/Homestack';
import update_Note from './components_bai2/Note_Components/update_Note';
import add_Note from './components_bai2/Note_Components/add_Note';
import Home from './components_bai2/Pages/Home';
import SettingPage from './components_bai2/Pages/SettingPage';
import Icon from "react-native-vector-icons/FontAwesome";
const stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();
 function Tabnavigation(){
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

export default function Bai2() {
  
  return (
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen name="Home" component={Tabnavigation}  options={{ headerShown: false }} />
            <stack.Screen name="Add Note" component={add_Note} />
            <stack.Screen name="update_Note" component={update_Note} />
        </stack.Navigator>
    </NavigationContainer>
  )
}