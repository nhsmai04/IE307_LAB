import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Categories1 from '././categories_page/Categories1';
import Categories2 from '././categories_page/Categories2';
import Categories3 from '././categories_page/Categories3';
const TopTab = createMaterialTopTabNavigator();
export default function Categories() {
    return (
       
            <TopTab.Navigator
              initialRouteName="Categories1"
              screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: '#633689' },
                tabBarIndicatorStyle: { backgroundColor: '#87B56A', height: 3 },
            }}>
                <TopTab.Screen name="Categories1" component={Categories1} />
                <TopTab.Screen name="Categories2" component={Categories2} />
                <TopTab.Screen name="Categories3" component={Categories3} />
            </TopTab.Navigator>
        
    )
}