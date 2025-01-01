import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Đã sửa import
import HomeScreen from './HomeScreen';
import Productdetail from './Productdetail';

const HomeStack = createStackNavigator();

export default function Home() {
  return (
    
      <HomeStack.Navigator initialRouteName="HomeScreen" >
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
        <HomeStack.Screen name="Productdetail" component={Productdetail}  />
        
      </HomeStack.Navigator>
    
  );
}
