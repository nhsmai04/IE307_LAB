import { View, Text, StyleSheet, FlatList,ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';
import ListItem from '../components_bai2/ListItem';
import Icon from "react-native-vector-icons/FontAwesome";

const TopTab = createMaterialTopTabNavigator();

function Main({ category, navigation }) {
  const { product } = useContext(AppContext);

  const filteredProducts = category === 'All'
    ? product
    : product.filter(item => item.category.toLowerCase() === category.toLowerCase());

  const renderItem = ({ item, index }) => {
    return (
        
      <ListItem item={item} index={index} navigation={navigation} namenavigation='ProductdetailScreen' />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false} // Vô hiệu hóa cuộn độc lập
        nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau
      />
    </ScrollView>
  );
}

export default function CategoriesScreen({ navigation }) {
  const { product } = useContext(AppContext);
    console.log(navigation );
  // Lấy danh sách danh mục từ sản phẩm
  const categories = ['All', ...new Set(product.map(item => item.category))]; // Thêm 'All' vào danh sách
  console.log(categories);

  // Định nghĩa icon cho từng danh mục
  const categoryIcons = {
    All: 'th-large',
    Electronics: 'tv',
    Jewelery: 'gem',
    "Men's clothing": 'male',
    "Women's clothing": 'female',
  };

  return (
    <TopTab.Navigator
    screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f8f8f8', // Màu nền sáng hơn
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        },
        swipeEnabled: true,
      }}
    >
      {categories.map((category, index) => (
        <TopTab.Screen
          key={index}
          name={category}
          children={() => <Main category={category} navigation={navigation} />}
          options={{
            tabBarLabel: ({ focused }) => (
              <View style={styles.tabLabelContainer}>
                <Icon
                  name={categoryIcons[category] || 'question'}
                  size={20}
                  color={focused ? 'blue' : 'black'}
                />
                <Text style={[styles.tabLabel, { color: focused ? 'blue' : 'black' }]}>
                  {category}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  tabLabelContainer: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
