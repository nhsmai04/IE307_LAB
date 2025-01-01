import { View, Text,StyleSheet,Button, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Profile({navigation}) {
    const handleOnpress = () =>{
        navigation.popToTop()
    }
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <TouchableOpacity 
            style={styles.button}
            onPress={handleOnpress}
            >
                <Text style={{color:'white'}}>LOG OUT</Text>
            </TouchableOpacity>           
        </View>
    )
}
const styles = StyleSheet.create({
container:{
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
button:{
    padding:10,
    backgroundColor:'blue',
    color:'white'
}   
})