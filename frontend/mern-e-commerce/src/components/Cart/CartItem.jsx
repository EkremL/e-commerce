import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        {/* <img src={cartItem.img.singleImage} alt="" />
        //fetch öncesi */}
        <img src={cartItem.img[0]} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price.toFixed(2)}</td>
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">
        {/* ${(cartItem.price.newPrice * cartItem.quantity).toFixed(2)} */}$
        {(cartItem.price * cartItem.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
