import React from "react";
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Gallery from "./Gallery/Gallery";
import PropTypes from "prop-types";
import Info from "./Info/Info";
import Tabs from "./Tabs/Tabs";
import "./ProductDetails.css";

const ProductDetails = ({ singleProduct }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <BreadCrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={singleProduct} />
              <Info singleProduct={singleProduct} />
            </main>
          </div>
          <Tabs singleProduct={singleProduct} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

ProductDetails.propTypes = {
  singleProduct: PropTypes.object,
};
