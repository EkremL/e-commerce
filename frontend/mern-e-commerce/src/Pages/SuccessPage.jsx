import React, { useContext, useEffect } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const SuccessPage = () => {
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Payment successful!"
          subTitle="Your order is completed."
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Go to Home Page</Button>
            </Link>,

            <Button key="buy">My Orders</Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default SuccessPage;
