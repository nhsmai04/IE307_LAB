import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'



export default function Notification({navigation}) {
  const handleSubmit = () =>{
    navigation.navigate( 'NotificationDetail')
  }
  return (
    <View style={styles.Container}>
      <Text>Notification Screen</Text>
      <TouchableOpacity
      
      onPress={handleSubmit}
      >
        <Text style={styles.btn}>GO TO DETAILS</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
Container:{
  display:'flex',
  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
btn:{
  padding:10,
  backgroundColor:'blue',
  color:'white'
}
})