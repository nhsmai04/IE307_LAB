import { View, Text,Button } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { useNavigation } from '@react-navigation/native';
import Media from './pages/Media';

import RecordVideoScreen from './pages/RecordVideoScreen';


const MediaStack = createStackNavigator() 
export default function Mediatack() {
  return (
    <MediaStack.Navigator initialRouteName='Media'>
        <MediaStack.Screen name="Media" component={Media} 
        options={({navigation}) => ({
          title: 'My Gallery',
          
        })}
        />
        <MediaStack.Screen name="RecordVideo" component={RecordVideoScreen} 
         
        />
        
    </MediaStack.Navigator>
  )
}