import React, { useContext } from "react";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartCoupon from "./CartCoupon";
import CartTotals from "./CartTotals";
import { CartContext } from "../../context/CartProvider";
import "./Cart.css";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon />
              </div>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          </div>
        ) : (
          <h2>Sepette hiç ürün yok!</h2>
        )}
      </div>
    </section>
  );
};

export default Cart;
