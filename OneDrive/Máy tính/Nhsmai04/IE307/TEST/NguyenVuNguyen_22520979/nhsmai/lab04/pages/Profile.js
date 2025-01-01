import { View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import EditProfile from './EditProfile';
const ProfileStack = createStackNavigator();
export default function Profile({ navigation }) {

    return (
        <ProfileStack.Navigator initialRouteName="ProfileScreen">
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}} />
            <ProfileStack.Screen name="EditProfile" component={EditProfile} />
        </ProfileStack.Navigator>
    );
}

