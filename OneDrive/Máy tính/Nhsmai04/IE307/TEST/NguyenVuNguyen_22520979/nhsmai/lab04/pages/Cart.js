import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../Contexts/AppContext.js';

export default function Cart({navigation}) {
  const { cart, setCart,handleUpdateQuantity,cartCount,DeleteProduct } = useContext(AppContext); // Thêm setCart để cập nhật giỏ hàng
  const [totalCart, setTotalCart] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    setTotalCart(total);
  }, [cart]);

  const handleUpdateCartQuantity = (id, method) => {
    if( method ==='minus' && cart.find(item => item.id === id).quantity === 1){
      setModalVisible(true);
    }
    else{
    handleUpdateQuantity(id, method);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>

      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {
              handleUpdateCartQuantity(item.id, 'minus');
              setSelectedItem(item);}}
          >
            <Icon name="minus" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateCartQuantity(item.id, 'add')}
          >
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.totalPrice}>${item.total}</Text>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setSelectedItem(item);}}
        >
        <Icon name="trash" size={20} color="#f00" />
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}

      >
        <View style={styles.centeredView}>
           <View style={styles.modalView}>
            <Text>Bạn có chắc muốn xoá sản phẩm này không?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  DeleteProduct(selectedItem.id);
                }}
              >
                <Text style={styles.modalButtonText}>Có</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  
                }}
              >
                <Text style={styles.modalButtonText}>Không</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>
      </Modal>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.checkoutContainer}>
            <Text style={styles.totalText}>Tổng cộng: ${totalCart}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Giỏ hàng của bạn trống</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Đến Trang Mua Hàng</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
    marginVertical: 3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#633689',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  checkoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#58ACD6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#633689',
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#58ACD6',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#58ACD6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },



});
