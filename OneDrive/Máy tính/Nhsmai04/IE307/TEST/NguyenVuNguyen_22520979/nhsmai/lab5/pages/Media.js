import React, { useCallback, useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StyleSheet, Image, Alert ,TouchableOpacity} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from 'expo-av';

export default function Media({ navigation }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => navigation.navigate("RecordVideo")}
        >
          <MaterialIcons name="videocam" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchMedia = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please allow access to your media files."
          );
          return;
        }

        const media = await MediaLibrary.getAssetsAsync({
          mediaType: [
            MediaLibrary.MediaType.photo,
            MediaLibrary.MediaType.video,
          ],
          first: 16,
          sortBy: [MediaLibrary.SortBy.creationTime],
        });

        const assets = await Promise.all(
          media.assets.map(async (asset) => {
            const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
            return { ...asset, uri: assetInfo.localUri || assetInfo.uri };
          })
        );

        setLoading(false);
        setMedia(assets);
      };

      fetchMedia();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        numColumns={2} // Hiển thị dạng lưới với 2 cột
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mediaItem}>
            {item.mediaType === "photo" ? (
              <Image source={{ uri: item.uri }} style={styles.image} />
            ) : (
              <Video
                source={{ uri: item.uri }}
                style={styles.video}
                useNativeControls // Hiển thị các nút điều khiển video
                resizeMode="contain"
                isLooping
              />
            )}
          </View>
        )}
        columnWrapperStyle={styles.columnWrapper} // Style để căn chỉnh giữa các cột
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 8, // Khoảng cách padding tổng thể
  },
  mediaItem: {
    flex: 1,
    margin: 8, // Khoảng cách giữa các ảnh trong grid
    backgroundColor: '#fff', // Màu nền của item
    borderRadius: 8, // Bo góc
    overflow: 'hidden', // Đảm bảo hình ảnh không vượt ra ngoài
  },
  image: {
    width: '100%', // Chiều rộng full
    height: 150, // Đặt chiều cao cố định
  },
  video: {
    width: '100%', // Chiều rộng full
    height: 150, // Đặt chiều cao cố định
  },
  columnWrapper: {
    justifyContent: 'space-between', // Đảm bảo các item trong cùng một hàng cách đều nhau
  },
  cameraButton: {
    backgroundColor: "#cf3339",
    borderRadius: 30,
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
