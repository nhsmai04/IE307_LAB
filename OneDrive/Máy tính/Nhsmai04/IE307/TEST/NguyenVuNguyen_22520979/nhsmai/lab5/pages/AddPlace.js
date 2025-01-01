import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image } from 'react-native'
import React, {useState,useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import MapView, {UrlTile} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome5";
import { insertPlace,createTable ,updateTable,checkTableColumns,dropTable } from '../database/db';

const MY_API_KEY = 'UHbxMRzfVuk5EZ8L3NuUURw_ibZ4LHQLQd67kNeV9Sg'; 

export default function AddPlace({navigation}) {
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [title, setTitle] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);  
  useEffect(() => {
    (async () => {
        createTable();
        
        const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);
  
    const handleTitle = async (text) => {
    setTitle(text)
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,  // Kiểu tệp hình ảnh
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1, 
        });
    
        // Kiểm tra xem người dùng đã chọn ảnh chưa
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
            alert('No image selected');
        }
    }
  
    const takePicture = async () => {
        if (hasCameraPermission) {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              quality: 1,
            });
      
            if (!result.canceled) {
              setImage(result.assets[0].uri); // Lưu URI của ảnh đã chụp
            }
          } else {
            alert('Camera permission is required!');
          }
    }

    const pickLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLatitude(userLocation.coords.latitude);
    setLongitude(userLocation.coords.longitude);
    getAddressFromCoordinates(latitude, longitude);
    }
    
    const pickOnMap = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLatitude(latitude);
        setLongitude(longitude);
        getAddressFromCoordinates(latitude, longitude);
        
    }

    const getAddressFromCoordinates = async (latitude, longitude) => {
        const apiKey = MY_API_KEY; // Replace with your HERE API Key
        const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apikey=${apiKey}`;
      
        try {
          const response = await axios.get(url);
          const address = response.data.items[0].address;
          
          alert(`Address: ${address.label}`);
            setLocation(address.label);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      };



    const handleSave = () => {
        console.log('Saving place with:', { title, image, latitude, longitude, location });

  // Kiểm tra các giá trị trước khi lưu
  if (!title || !image || latitude === null || longitude === null || !location) {
    alert('Please fill all fields');
    return; // Dừng thực thi nếu thiếu dữ liệu
  }

  try {
    insertPlace(title, image, latitude, longitude, location, () => {
      navigation.goBack();
    });
  } catch (error) {
    console.error('Error when inserting place:', error);
    alert('Error when inserting place: ' + error.message);
  }

  // Reset các giá trị
  setTitle('');
  setImage(null);
  setLatitude(null);
  setLongitude(null);
  setLocation(null);  // Cũng nên reset location
    }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:24, fontWeight:'bold', marginHorizontal:10 }}>Title</Text>
      <TextInput style={{borderWidth:1, borderColor:'black', padding:10, marginHorizontal:10}} value={title} onChangeText={handleTitle}/>
      <View style={styles.imagePreview}>
        {!image ? <Text>No image picked yet.</Text> : <Image source={{ uri: image }} style={styles.image} />}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Icon name="image" size={24} color="white" />
        <Text>Pick Image</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Icon name="camera" size={24} color="white" />
          <Text>Take Picture</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.locationPreview}>
        {!location ? <Text>No location picked yet.</Text> 
        : 
        <MapView 
        style={styles.map} 
        region={{
            latitude: location.latitude || 10.729904464832261, 
            longitude: location.longitude ||106.6179990237564,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        onPress={(event) => pickOnMap( event)
        }

        >
            <UrlTile
            urlTemplate={`https://dev.virtualearth.net/REST/v1/Imagery/Metadata/Road?zl={z}&x={x}&y={y}&key=${MY_API_KEY}`}
            maximumZ={19}
            tileSize={256}
            />

            
            </MapView>}
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickLocation}>
                <Icon name="map-marker-alt" size={24} color="white" />
                <Text>Locate User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickOnMap}>
                <Icon name="map-marked-alt" size={24} color="white" />
                <Text>Pick on Map</Text>  
            </TouchableOpacity>
        </View>

      <View style={styles.buttonSave}>
        <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
          <Icon name="save" size={24} color="white" />
          <Text style={{color:'white'}} >SAVE</Text>
        </TouchableOpacity>
      </View>




    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',    
        justifyContent: 'center',
        
    },
    locationPreview: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical:10,
    },
    imagePreview: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical:10,
    },
    map:{
        width: '100%',
        height: '100%',
    },
        image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: 'blue',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    buttonSave: {
        display: 'flex',
        flexDirection: 'column',
        
        height:'auto',
        marginVertical:10,
        marginHorizontal:20,
       backgroundColor:'#2096f1'
    },
    btnSave: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 5,
    },
})



