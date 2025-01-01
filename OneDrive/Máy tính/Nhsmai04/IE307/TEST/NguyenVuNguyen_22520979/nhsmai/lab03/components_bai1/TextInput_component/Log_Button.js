// Log_Button.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function Log_Button({ NAME, navigation }) {
    const { email, password } = useContext(AppContext); // Lấy email và password từ AppContext

    const handlePress = () => {
        if (email === '22520979@gm.uit.edu.vn' && password === 'nguyenvunguyen') {
            navigation.navigate('header_container');
        } else {
            alert('Incorrect email or password');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button1} onPress={handlePress}>
                <Text style={{ color: 'white', fontSize: 20 }}>{NAME}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        marginTop: 5,
    },
    button1: {
        padding: 20,
        backgroundColor: 'orange',
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },
});
