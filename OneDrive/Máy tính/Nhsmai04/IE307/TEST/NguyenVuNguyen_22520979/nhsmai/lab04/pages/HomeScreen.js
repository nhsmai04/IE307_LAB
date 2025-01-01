import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getData } from '../apiData/getData';
import ListItem from '../components_bai2/ListItem';
import Icon from "react-native-vector-icons/FontAwesome";
import { AppContext } from '../Contexts/AppContext';
const { width } = Dimensions.get('window');
const Data = [
  {
    id: "1",
    img: 'https://img.gotit.vn/compress/brand/images/1704283768_TbZp7.png',
  },
  {
    id: "2",
    img: 'https://cdn.tgdd.vn/News/Thumb/0/Thumb-V1-1200x628.jpg',
  },
  {
    id: "3",
    img: 'https://img.gotit.vn/compress/brand/images/1704283768_TbZp7.png',
  },
  {
    id: "4",
    img: 'https://cdn.tgdd.vn/Files/2019/04/25/1162936/dienthoai-1_800x450.jpg',
  },
];

export default function HomeScreen({navigation}) {
  const {setProduct}  = useContext(AppContext);
  
  const [productsArray1, setProductsArray1] = useState([]);
  const [productsArray2, setProductsArray2] = useState([]);

  useEffect(() => {
    getData({ table:'products'}).then((data) => {
      setProductsArray1(data.slice(0, 10));
      setProductsArray2(data.slice(10, 20));
      setProduct(data);
    });
  }, []);

  const renderItem = ({ item, index }) => { 
    return (
        <ListItem item={item} index={index} navigation={navigation} namenavigation='Productdetail' />
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.header}>Shop for quality, Shop for style</Text>

      {/* Carousel */}
      
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        data={Data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.img }} style={styles.image} />
          </View>
        )}
      />
      

      {/* FlatList */}
      <View style={styles.list}>
      <View style={styles.header_content}>
          <Text style={styles.title}>Hot Deal</Text>  
           <Icon name="free-code-camp" size ={40}/>  
      </View>
      <FlatList
        data={productsArray1}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false} // Vô hiệu hóa cuộn độc lập
        nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau
      />

      {/* FlatList */}
      <View style={styles.header_content}>
          <Text style={styles.title}>New Arrivals</Text>  
          <Icon name="home" size ={20}/> 
      </View>
      <FlatList
        data={productsArray2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false} // Vô hiệu hóa cuộn độc lập
        nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau
      />

      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  list:{
    marginTop:10,
  },
  header_content:{
    flexDirection:'row',
    alignItems:'center',
  },
  title:{
    textAlign:'flex-start',
    marginLeft:15,
    marginRight:10,
    fontSize: 20,
    color:'red',
    fontWeight:'bold',
  },
  listContainer: {
    padding: 10,
  },
});
