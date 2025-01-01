import { View, Text, StyleSheet, Image, ScrollView,Button } from 'react-native';
import React, { useEffect } from 'react';

export default function Productdetail({ route, navigation, categorires =null }) {
  const { item } = route.params;

  useEffect(() => {
    // Đặt tiêu đề Stack Navigation
    navigation.setOptions({ title: item.title ,headerLeft: () => (
      <Button
        title="Back"
        onPress={() => navigation.goBack()} // Quay lại trang trước
      />
    ),});
  }, [navigation, item.title]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.content}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productDes}>{item.description}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
        <Text style={styles.ratingText}>
          Rating: {item.rating.rate} ⭐ ({item.rating.count})
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 10,
  },
  productImage: {
    height: 300, // Chiều cao cụ thể cho hình ảnh
    width: '100%',
    resizeMode: 'contain',
    marginVertical: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDes: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22, // Tăng khoảng cách dòng để dễ đọc
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'green',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});
