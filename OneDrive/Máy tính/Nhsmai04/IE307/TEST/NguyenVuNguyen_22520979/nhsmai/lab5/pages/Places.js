import { View, Text ,StyleSheet,ScrollView,FlatList, Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { fetchPlaces } from '../database/db';
export default function Places() {
  const [places, setPlaces] = useState([])
  useFocusEffect(
    React.useCallback(() => {
      fetchPlaces(setPlaces);
    }, [])
  );

    const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.location}</Text>
      </View>
    </View>
    );

  return (
    <View style={styles.container} >
        <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        />
    </View>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
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