import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  //her sayfa yenilendiğinde boş array ile başlatacağı için değerler kaybolacak ve resetlenecek bu yüzden değer varsa getir yoksa boş arrayla başlat diyoruz
  //   console.log("cart items", cartItems);
  const calculateQuantity = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].quantity;
    }
    return total;
  };
  // console.log(calculateQuantity());
  //*localstorage içinde değeri tutma
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    setCartItems((prevItems) => [
      ...prevItems,
      {
        ...cartItem,
        quantity: cartItem.quantity ? cartItem.quantity : 1,
      },
    ]);
  };

  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
      return cartItem._id !== itemId;
    });
    setCartItems(filteredCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        calculateQuantity,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
      }} //setcartıtemsi kupon kodunu uygulayabilmek için gönderiyoruz
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};
