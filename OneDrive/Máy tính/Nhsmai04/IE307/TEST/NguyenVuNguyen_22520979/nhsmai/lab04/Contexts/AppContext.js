// AppContext.js
import React, { createContext, useState } from 'react';

// Tạo AppContext
export const AppContext = createContext();

// AppProvider
export const AppProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token,setToken] = useState('')
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [product,setProduct]=useState([]);
    const [dataUserApp,setUserData]=useState([]);
    // Hàm cập nhật Username và password
    const updateUsername = (newUsername) => setUsername(newUsername);
    const updatePassword = (newPassword) => setPassword(newPassword);
    const updateToken =(currentToken) => setToken(currentToken);
    const updateDataUser = (newDataUser) => setUserData(newDataUser);
    // Ham cap nhat so luong san pham trong gio hang
    const updatedCartCount = (method) => {
       if(method === 'plus'){
              setCartCount(cartCount+1);
       }
        else if(method === 'minus'){
            setCartCount(cartCount-1);
        }
    }

    // Hàm cập nhật giỏ hàng
    const addToCart = (product) => {
        setCart((prevCart) => {
          // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
          const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
    
          if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, tăng quantity và tính lại total
            const updatedCart = [...prevCart];
            updatedCart[existingProductIndex].quantity += 1;
            updatedCart[existingProductIndex].total = 
              updatedCart[existingProductIndex].quantity * updatedCart[existingProductIndex].price;
    
            return updatedCart;
          } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            return [
              ...prevCart,
              {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: 1,
                total: product.price,
              },
            ];
          }
        });
      };

      //Ham update quantity
      // Hàm update số lượng
      const handleUpdateQuantity = (productId, action) => {
        // Cập nhật giỏ hàng mới
        const updatedCart = cart
          .map(item => {
            if (item.id === productId) {
              // Nếu hành động là 'minus' và số lượng là 1, bỏ qua sản phẩm
     
      
              // Cập nhật số lượng sản phẩm dựa trên hành động
              const newQuantity = action === 'add' ? item.quantity + 1 : item.quantity - 1;
      
              // Tính lại tổng tiền của sản phẩm
              const newTotal = newQuantity * item.price;
      
              // Trả về sản phẩm với thông tin mới
              return {
                ...item,
                quantity: newQuantity,
                total: newTotal,
              };
            }
      
            return item; // Giữ nguyên các sản phẩm khác
          }); // Loại bỏ các sản phẩm bị xóa (null)
      
          // Cập nhật giỏ hàng trong context
        setCart(updatedCart);
      
        // Tính lại tổng giỏ hàng
        const totalCart = updatedCart.reduce((sum, item) => sum + item.total, 0);
        setCartTotal(totalCart);
      
        // Tính lại tổng số lượng sản phẩm
        const totalCount = updatedCart.reduce((count, item) => count + item.quantity, 0);
        setCartCount(totalCount);
      };
      
    const DeleteProduct = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
         // Tính lại tổng giỏ hàng
         const totalCart = updatedCart.reduce((sum, item) => sum + item.total, 0);
         setCartTotal(totalCart);
       
         // Tính lại tổng số lượng sản phẩm
         const totalCount = updatedCart.reduce((count, item) => count + item.quantity, 0);
         setCartCount(totalCount);
    }

     
    return (
        <AppContext.Provider value={{ 
            username, password,
            token, 
            cart, 
            cartCount, 
            cartTotal,
            product,
            dataUserApp,
            setProduct,
            updateUsername, 
            updatePassword,
            updateToken,
            updatedCartCount,
            addToCart,
            handleUpdateQuantity,
            DeleteProduct,
            updateDataUser,
            }}>
            {children}
        </AppContext.Provider>
    );
};
