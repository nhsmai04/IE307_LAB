import { View, Text ,StyleSheet,ScrollView,FlatList, Image,TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { fetchPlaces,dropTable } from '../database/db';
import Icon from "react-native-vector-icons/FontAwesome5";
export default function Places({navigation}) {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true);
//  useEffect(() => {
//   dropTable();
// })
 
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddPlace")}
        >
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      fetchPlaces(setPlaces);
      setLoading(false);
    }, [])
  );

    const renderItem = ({ item }) => (
   <TouchableOpacity
    onPress={() => {
      navigation.navigate('PlaceDetail', {
        item: item,
      });
    }}
   >
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.location}</Text>
      </View>
    </View>
   </TouchableOpacity>
   
    );

  return (
    <View style={styles.container} >
        {places.length > 0 ?(
          <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        />
        ): loading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#cf3339" />
        </View>
        ):(
          <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>
            No places added yet! Start adding some.
          </Text>
        </View>
        )}
        
    </View>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton:{
    backgroundColor: "orange",
    borderRadius: 30,
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",

  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  detailsContainer: {
    flex:1,
    marginLeft: 12,
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

})