import { View, Text,StyleSheet, TouchableOpacity ,Image} from 'react-native'
import React ,{useContext}from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../Contexts/AppContext';
export default function ListItem({item, index ,navigation ,namenavigation}) {
  const { addToCart, updatedCartCount } = useContext(AppContext); 
  
  const handleAddToCart = (item) => {
        addToCart(item);
        updatedCartCount('plus');
  }
      return (
    <>
    
      <View style={styles.container}>  
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <TouchableOpacity onPress={() => navigation.navigate(namenavigation, {item})}>
          <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
          </TouchableOpacity>
           
         <View style={styles.productInfor}>
          <View style={styles.productReview}>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.ratingText}>{item.rating.rate} ⭐ ({item.rating.count})</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={()=>handleAddToCart(item)}>
            <Text style={styles.addToCartText}>+</Text>
          </TouchableOpacity>
         </View>
        </View>
      </View>
    </>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap', // Hiển thị các item theo dạng lưới
    justifyContent: 'space-between', // Khoảng cách đều giữa các item
    padding: 5, // Thêm khoảng cách bên ngoài
  },
  header:{
    width:'100%',
  },
  title: {
    width: '100%', // Chiếm 100% chi
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    margin: 5, // Khoảng cách giữa các item
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    height: 'fit-content', // Chiều cao mỗi item
    width: '100%', // Chiếm 48% chiều rộng màn hình
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10, // Thêm khoảng cách giữa ảnh và tên sản phẩm
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  productInfor:{
    width:'100%',
    alignItems:"flex-end",
    flexDirection:'row',
    justifyContent:'space-between',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4500',
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffa500',
  },
  reviewText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center', // Căn giữa text mô tả
    
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
