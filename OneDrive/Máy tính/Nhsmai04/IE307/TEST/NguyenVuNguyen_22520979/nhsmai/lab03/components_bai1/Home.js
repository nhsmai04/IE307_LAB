import { View, Text ,StyleSheet, Button,TouchableOpacity} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDetail from '../HomeDetail';


//function HomeScreen({ navigation }) {
   
//}

export default function HomeStack({navigation}) {
    const handleOnPress = () => {
        navigation.navigate('HomeDetail'); // Navigate to HomeDetail within HomeStack
    };

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleOnPress}
            >
                <Text style={styles.buttonText}>Go to Detail</Text>
            </TouchableOpacity>
        </View>
    );
}
  const styles = StyleSheet.create({
    container:{
      display:'flex',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  buttonText:{
      padding:10,
      backgroundColor:'blue',
      color:'white'
  }   

  }) 