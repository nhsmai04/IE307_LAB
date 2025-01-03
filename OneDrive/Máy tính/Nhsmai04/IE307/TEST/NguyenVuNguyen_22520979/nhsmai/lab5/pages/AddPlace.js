import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image } from 'react-native'
import React, {useState,useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import MapView, {UrlTile,Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from "react-native-vector-icons/FontAwesome5";
import { insertPlace,createTable ,updateTable,checkTableColumns,dropTable } from '../database/db';
import * as Notifications from 'expo-notifications';
import { getAddressFromCoordinates } from '../api/fetchapi';
const MY_API_KEY = 'UHbxMRzfVuk5EZ8L3NuUURw_ibZ4LHQLQd67kNeV9Sg'; 

export default function AddPlace({navigation}) {
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [title, setTitle] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);  
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
      const { status } = await Camera.requestCameraPermissionsAsync();
    
      if (status === 'granted') {
        // Quyền truy cập đã được cấp
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri); // Lưu URI của ảnh đã chụp
        }
      } else {
        // Thông báo nếu người dùng không cấp quyền
        alert('Camera permission is required!');
      }
    };
    

    const pickLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
      }
      try {
          const userLocation = await Location.getCurrentPositionAsync({});
          console.log('User location:', userLocation);
          
          const lat = userLocation.coords.latitude;
          const lng = userLocation.coords.longitude;
  
          // Cập nhật state
          setLatitude(lat);
          setLongitude(lng);
          setSelectedLocation({ latitude: lat, longitude: lng });
  
          // Gọi hàm lấy địa chỉ với tọa độ trực tiếp
        const temp = await getAddressFromCoordinates(lat, lng);
        setLocation(temp);
      } catch (error) {
          console.error('Error fetching user location:', error);
          alert('Failed to get user location');
      }
  };
  const pickOnMap = () => {
    navigation.navigate('PickonMap', { setLatitude, setLongitude, setSelectedLocation,location,setLocation });
  };


  const handleSave = () => {
    console.log('Saving place with:', { title, image, latitude, longitude, location });

  // Kiểm tra các giá trị trước khi lưu
  if (!title || !image || latitude === null || longitude === null || !location) {
    alert('Please fill all fields');
    return; // Dừng thực thi nếu thiếu dữ liệu
  }

  try {
    insertPlace(title, image, latitude, longitude, location,  () => {
      setTitle('');
      setImage(null);
      setLatitude(null);
      setLongitude(null);
      setLocation(null);

       Notifications.scheduleNotificationAsync({
        content: {
          title: "Places added Successfully",
          body: "Your place has been saved successfully!",
        },
        trigger: null,
      });

      console.log('Going back...');
      navigation.goBack();
      
    });
  } catch (error) {
    console.error('Error when inserting place:', error);
    alert('Error when inserting place: ' + error.message);
  }

  // Reset các giá trị
    // Cũng nên reset location
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
            latitude: latitude || 10.729904464832261, 
            longitude: longitude ||106.6179990237564,
            latitudeDelta: 0.005, // Giảm giá trị này để phóng to hơn
                longitudeDelta: 0.005, // Giảm giá trị này để phóng to hơn
        }}      
        >
            <UrlTile
            urlTemplate={`https://dev.virtualearth.net/REST/v1/Imagery/Metadata/Road?zl={z}&x={x}&y={y}&key=${MY_API_KEY}`}
            maximumZ={25}
            tileSize={256}
            />
          {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
            <Callout>
              <View style={styles.callout}>
                  <Text style={styles.calloutText}>{location}</Text>
              </View>
            </Callout>
            </MapView>}
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickLocation}>
                <Icon name="map-marker-alt" size={24} color="white" />
                <Text>Locate User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>pickOnMap(navigation,setLatitude,setLongitude)}>
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
    callout: {
      width: 200,
      padding: 5,
      backgroundColor: 'white',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    calloutText: {
      fontSize: 14,
      color: '#333',
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



