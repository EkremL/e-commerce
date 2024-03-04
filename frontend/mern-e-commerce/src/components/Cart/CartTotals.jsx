import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { message, Spin } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const CartTotals = () => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;

  //fiyat hesaplama
  //map ile toplam fiyatları yeni diziye atamış olduk
  const cartItemTotals = cartItems.map((item) => {
    // const itemTotal = item.price.newPrice * item.quantity;
    //!fetch sonrasi
    const itemTotal = item.price * item.quantity;

    return itemTotal;
  });

  const subTotals = cartItemTotals.reduce((prevValue, currentValue) => {
    return prevValue + currentValue;
  }, 0); //0 burada başlangıç değeri

  // console.log(subTotals);

  const cargoFee = 15;
  const Total = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  //!payment
  const handlePayment = async () => {
    setLoading(true);
    if (!user) {
      return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
    }
    //ürün, kullanıcı ve kargo bilgilerini ödeme ekranına göndereceğiz
    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };
    // console.log(body);
    //?reactla stripe'ı kullanabilmek için @stripe/stripe.js kuruyoruz
    try {
      const stripe = await loadStripe(stripePublicKey); //public keyi buraya yazıyoruz, güvenli olması için .env'ye yazıyoruz
      //daha sonra apiye istek atıyoruz
      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemi başarısız oldu!");
      }

      const session = await res.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        //hatayı stripenin kendi paketi göndereceği için bu şekilde yazdık
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${Total}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <Spin spinning={loading}>
          <button className="btn btn-lg" onClick={handlePayment}>
            Proceed to checkout
          </button>
        </Spin>
      </div>
    </div>
  );
};

export default CartTotals;
