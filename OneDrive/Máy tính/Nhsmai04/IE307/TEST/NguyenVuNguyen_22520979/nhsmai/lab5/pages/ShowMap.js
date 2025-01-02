import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';

export default function ShowMap({ route, navigation }) {
  const { latitude, longitude, location } = route.params;
  const mapViewRef = useRef(null);  // Tham chiếu tới MapView
  const [isReady, setIsReady] = useState(false);  // Trạng thái để kiểm tra khi MapView đã sẵn sàng

  // Kiểm tra khi MapView đã sẵn sàng và cuộn tới vị trí
  useEffect(() => {
    if (isReady && mapViewRef.current) {
      mapViewRef.current.animateToRegion(
        {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000 // Thời gian cuộn, tính bằng milliseconds
      );
    }
  }, [latitude, longitude, isReady]);  // Khi latitude và longitude thay đổi

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}  // Gán tham chiếu
        style={styles.map}
        initialRegion={{
          latitude: 10.729904464832261,
          longitude: 106.6179990237564,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => setIsReady(true)}  // Đặt trạng thái khi bản đồ đã sẵn sàng
      >
        {latitude && longitude && (
          <Marker coordinate={{ latitude, longitude }}>
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutText}>{location}</Text>
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
