import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Alert, Button ,Text} from 'react-native';
import MapView, { Marker,Callout } from 'react-native-maps';
import { getAddressFromCoordinates } from '../api/fetchapi';
export default function PickonMap({ route, navigation }) {
    const { setLatitude, setLongitude,setSelectedLocation, location,setLocation} = route.params;
    const [selectedLocationtemp, setSelectedLocationtemp] = useState(null);
    const [address, setAddress] = useState('');
  const handleSelectLocation = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocationtemp({ latitude, longitude });
    const temp =  getAddressFromCoordinates(latitude, longitude);
    setAddress(temp);
  };

  const handleSaveLocation = async () => {
    if (!selectedLocationtemp) {
      Alert.alert('No location selected', 'Please select a location on the map.');
      return;
    }
    setLatitude(selectedLocationtemp.latitude);
    setLongitude(selectedLocationtemp.longitude);
    setSelectedLocation(selectedLocationtemp);
   const temp = await getAddressFromCoordinates(selectedLocationtemp.latitude, selectedLocationtemp.longitude);
   setLocation(temp);
   navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSaveLocation}
          title="Save"
          color="#000"
        />
      ),
    });
  }, [navigation, selectedLocationtemp]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.729904464832261,
          longitude: 106.6179990237564,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleSelectLocation}
      >
        {selectedLocationtemp && (
          <Marker coordinate={selectedLocationtemp} >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutText}>{address}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
});