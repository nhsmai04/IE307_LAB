import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
export default function InputText({ name, icon, value ,onChangeText}) {
    return (
        <View style={styles.container}>
            <View style={styles.container_input}>
                <Icon name={icon} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={name}
                    placeholderTextColor="gray"
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container:
    {
        display: 'flex', 
        flex:1  
    },
    container_input: {
        display: 'flex',
        marginTop: 10,
        
        padding: 10,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'gray',
        alignItems:'center',
    },
    input: {
        flex:7,
        height: 'auto',
    },
    icon: {
        flex:1,
        fontSize: 30,
        paddingHorizontal:15
    },

})