import { View, Text ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import Icon from "react-native-vector-icons/FontAwesome5";


export default function PlaceDetail({route,navigation}) {
 const { item } = route.params;
 console.log("item",item);
 const [place, setPlace] = useState([]);
    useEffect(() => {
      setPlace(item);
    }, [item]);

 return (
    <View style={styles.container}> 
        <Image source={{ uri: place.image }} style={styles.productImage} />
        <Text style={styles.title}>{place.title}</Text>
        <Text>{place.location}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('ShowMap', {
                latitude: place.latitude,
                longitude: place.longitude,
                location: place.location,
          });
        }}
        >
            <Icon name="map-marker-alt" size={24} color="black" />
            <Text>View on Map</Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,

},
button:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    gap: 10,
    marginTop:10
},
})