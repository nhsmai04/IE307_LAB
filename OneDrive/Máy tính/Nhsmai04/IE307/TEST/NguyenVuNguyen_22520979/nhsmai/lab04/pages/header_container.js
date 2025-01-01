import { View, Text, StyleSheet } from 'react-native';
import React,{useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppContext } from '../Contexts/AppContext.js';
import Home from './Home.js';
import Categories from './Categories.js';
import Cart from './Cart.js';
import Profile from './Profile.js';

const Tab = createBottomTabNavigator();

export default function Header_container() {
    const { cartCount } = useContext(AppContext);
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
                    component={Home}
                    
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
                    name="Cart"
                    component={Cart}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="shopping-cart" color={color} size={size} />
                        ),
                        tabBarBadge: cartCount,
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
