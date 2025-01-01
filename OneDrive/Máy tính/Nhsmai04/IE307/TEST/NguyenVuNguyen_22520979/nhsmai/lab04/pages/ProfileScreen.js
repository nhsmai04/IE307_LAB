import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Contexts/AppContext';
import { getData } from '../apiData/getData';
const jwtDecode = require('jwt-decode');

export default function ProfileScreen({ navigation }) {
    const { token, updateDataUser, dataUserApp } = useContext(AppContext);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Flag to check if data is loaded
   
    

    // Fetch user data
    
    
    const handleLogout = () => {
        navigation.popToTop();
    };

    // Check if dataUserApp is available before rendering
    if (!dataUserApp) {
        return <Text>Loading...</Text>;
    }

    const { name, username, email, phone, address, avatar } = dataUserApp;
    const fullName = name ? `${name.firstname} ${name.lastname}` : 'No Name Provided';
    const avatarUri = avatar || 'https://vcdn1-giaitri.vnecdn.net/2022/02/21/chau-2264-1645430552.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=0bK1TgmIE8mBjgomsY5yeA';
    const userAddress = address ? `${address.number}, ${address.street}, ${address.city}` : 'No Address Provided';

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <Image style={styles.avatar} source={{ uri: avatarUri }} />
                <Text style={styles.fullName}>{fullName}</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditProfile', { dataUserApp })} // Pass the dataUserApp here
                >
                    <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
            </View>

            {/* User Information */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Name: {fullName}</Text>
                <Text style={styles.infoText}>Username: {username}</Text>
                <Text style={styles.infoText}>Email: {email}</Text>
                <Text style={styles.infoText}>Phone: {phone}</Text>
                <Text style={styles.infoText}>Address: {userAddress}</Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    fullName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        backgroundColor: '#ddd',
        borderRadius: 50,
    },
    editButtonText: {
        fontSize: 18,
        color: '#000',
    },
    infoContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: 'blue',
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
