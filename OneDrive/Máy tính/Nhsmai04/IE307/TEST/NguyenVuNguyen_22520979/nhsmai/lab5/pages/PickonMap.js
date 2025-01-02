import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function PickonMap({ route, navigation }) {
    const { setLatitude, setLongitude,setSelectedLocation, getAddressFromCoordinates } = route.params;
  const [selectedLocationtemp, setSelectedLocationtemp] = useState(null);

  const handleSelectLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocationtemp({ latitude, longitude });
  };

  const handleSaveLocation = () => {
    if (!selectedLocationtemp) {
      Alert.alert('No location selected', 'Please select a location on the map.');
      return;
    }
    setLatitude(selectedLocationtemp.latitude);
    setLongitude(selectedLocationtemp.longitude);
    setSelectedLocation(selectedLocationtemp);
    getAddressFromCoordinates(selectedLocationtemp.latitude, selectedLocationtemp.longitude);
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
          <Marker coordinate={selectedLocationtemp} />
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
});