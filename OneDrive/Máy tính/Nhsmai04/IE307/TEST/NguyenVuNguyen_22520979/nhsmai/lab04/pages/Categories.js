import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Đã sửa import

import Productdetail from './Productdetail';
import CategoriesScreen from './CategoriesScreen';
const CategoriesStack = createStackNavigator();


export default function Categories() {
   return(
    <CategoriesStack.Navigator initialRouteName="CategoriesScreen" >
        <CategoriesStack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{headerShown:false}} />
        <CategoriesStack.Screen name="ProductdetailScreen" component={Productdetail}  />
    </CategoriesStack.Navigator>
   ) 
}