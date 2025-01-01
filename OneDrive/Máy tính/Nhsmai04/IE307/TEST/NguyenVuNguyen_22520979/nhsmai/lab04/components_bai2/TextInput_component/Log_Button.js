// Log_Button.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import axios from 'axios'
import { getData } from '../../apiData/getData';
const jwtDecode = require('jwt-decode');
export default function Log_Button({ NAME,username,password, navigation }) {
    const {  token, updateToken, updateUsername, updatePassword, updateDataUser} = useContext(AppContext); // Lấy email và password từ AppContext



        const login = async () =>{
            console.log('something')
            await axios.post('https://fakestoreapi.com/auth/login',{
                username: username,
                password: password,
            })
            .then(response => {
                console.log(response.data.token);
                updateUsername(username);
                updatePassword(password);
                updateToken(response.data.token);
                const decoded = jwtDecode(response.data.token);
                getData({ table: 'users', id: decoded.sub }).then((data) => {
                        updateDataUser(data); // Update AppContext with user data
                       // Set data as loaded
                        console.log(data);
                    });
                navigation.navigate("header_container");
            })
            .catch(
                error => console.error(error)
            )
        }
        

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button1} onPress={login}>
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
