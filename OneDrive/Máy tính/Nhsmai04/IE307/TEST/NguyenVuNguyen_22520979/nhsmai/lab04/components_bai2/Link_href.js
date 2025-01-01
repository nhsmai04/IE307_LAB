import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Link_href({title,content,name,navigation}) {
  return (
    <View style={styles.container}> 
      <Text>{title}</Text>
      
    <TouchableOpacity
    onPress={()=> navigation.navigate(name)}
    >
        <Text style={{color:'blue',fontWeight:'bold'}}>{content}</Text>
    </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
container:{
    display:'flex',
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    marginTop:20
}
})