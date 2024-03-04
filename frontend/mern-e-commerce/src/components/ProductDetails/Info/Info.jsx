import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../../../context/CartProvider";

import "./Info.css";

const Info = ({ singleProduct }) => {
  const [activeColor, setActiveColor] = useState("blue");
  const [activeSize, setActiveSize] = useState("XS");
  const { addToCart, cartItems } = useContext(CartContext);
  const quantityRef = useRef();

  const handleColorClick = (e, color) => {
    e.preventDefault();
    setActiveColor(color);
  };

  const handleSizeClick = (e, size) => {
    e.preventDefault();
    setActiveSize(size);
  };

  const originalPrice = singleProduct.price.current;
  const discountPercentage = singleProduct.price.discount;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === singleProduct._id
  );

  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
      <div className="product-review">
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <span>2 reviews</span>
      </div>
      <div className="product-price">
        <s className="old-price">${originalPrice.toFixed(2)}</s>
        <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
      </div>
      {/* react quill ile ürün açıklaması yazılınca html tagları açıklamada görünüyor bunu engellemek için dangerouslySetInnerHTML kullaniyoruz ve descriptionu taglar arasına değil içine belirtiyoruz */}
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {/* artik verileri dinamik olarak cekicez */}
              {/* <div
                className={`color-wrapper ${
                  activeColor === "blue" ? "active" : ""
                }`}
              >
                <label
                  className="blue-color"
                  id="blue"
                  onClick={(e) => handleColorClick(e, "blue")}
                >
                  <input type="radio" name="product-color" />
                </label>
              </div>
              <div
                className={`color-wrapper ${
                  activeColor === "red" ? "active" : ""
                }`}
              >
                <label
                  className="red-color"
                  id="red"
                  onClick={(e) => handleColorClick(e, "red")}
                >
                  <input type="radio" name="product-color" />
                </label>
              </div>
              <div
                className={`color-wrapper ${
                  activeColor === "green" ? "active" : ""
                }`}
                id="green"
                onClick={(e) => handleColorClick(e, "green")}
              >
                <label className="green-color">
                  <input type="radio" name="product-color" />
                </label>
              </div>
              <div
                className={`color-wrapper ${
                  activeColor === "purple" ? "active" : ""
                }`}
                id="purple"
                onClick={(e) => handleColorClick(e, "purple")}
              >
                <label className="purple-color">
                  <input type="radio" name="product-color" />
                </label>
              </div> */}
              {singleProduct.colors.map((color, index) => (
                <div
                  className={`color-wrapper ${
                    activeColor === color ? "active" : ""
                  }`}
                  key={index}
                >
                  <label
                    style={{
                      backgroundColor: `#${color}`,
                    }}
                    onClick={(e) => handleColorClick(e, color)}
                  >
                    <input type="radio" name="product-color" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {/* statik veriler */}
              {/* <span
                id="XS"
                className={`${activeSize === "XS" ? "active" : ""}`}
                onClick={(e) => handleSizeClick(e, "XS")}
              >
                XS
              </span>
              <span
                id="S"
                className={`${activeSize === "S" ? "active" : ""}`}
                onClick={(e) => handleSizeClick(e, "S")}
              >
                S
              </span>
              <span
                id="M"
                className={`${activeSize === "M" ? "active" : ""}`}
                onClick={(e) => handleSizeClick(e, "M")}
              >
                M
              </span>
              <span
                id="L"
                className={`${activeSize === "L" ? "active" : ""}`}
                onClick={(e) => handleSizeClick(e, "L")}
              >
                L
              </span>
              <span
                id="XL"
                className={`${activeSize === "XL" ? "active" : ""}`}
                onClick={(e) => handleSizeClick(e, "XL")}
              >
                XL
              </span> */}
              {/* dinamik (fetch) edilen veriler */}
              <span
                id="XL"
                className={`${activeSize === "XL" ? "active" : ""}`}
                onClick={(e) => handleSizeClick(e, "XL")}
              >
                XL
              </span>
              {singleProduct.sizes.map((size, index) => (
                <span
                  className={`${activeSize === size ? "active" : ""}`}
                  key={index}
                  onClick={(e) => handleSizeClick(e, size)}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />

            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCart}
              onClick={() =>
                addToCart({
                  ...singleProduct,
                  price: discountedPrice,
                  quantity: parseInt(quantityRef.current.value),
                })
              }
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.propTypes = {
  singleProduct: PropTypes.object,
};
