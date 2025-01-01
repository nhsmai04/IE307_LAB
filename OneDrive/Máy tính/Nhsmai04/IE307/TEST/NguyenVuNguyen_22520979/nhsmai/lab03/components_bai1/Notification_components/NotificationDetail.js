import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function NotificationDetail() {
  return (
    <View style={styles.container}>
      <Text>NotificationDetail</Text>
    </View>
  )
}
const styles = StyleSheet.create({
container:{
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
})