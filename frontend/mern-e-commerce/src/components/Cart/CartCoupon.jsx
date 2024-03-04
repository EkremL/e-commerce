import React, { useContext, useState } from "react";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { cartItems, setCartItems } = useContext(CartContext);

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      message.warning("Boş değer girilemez");
      return;
    }
    // console.log(couponCode);
    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);
      // console.log(res);
      if (!res.ok) {
        message.error("There was an error applying the coupon");
        return;
      }

      const data = await res.json();
      // console.log(data);
      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((item) => {
        //birden fazla işlem old için obje açtık
        const updatePrice = item.price * (1 - discountPercent / 100);
        return {
          ...item,
          price: updatePrice,
        };
      });
      setCartItems(updatedCartItems);

      message.success("Coupon applied successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
