import React from "react";
import PropTypes from "prop-types";
import "./CategorieItem.css";

const CategorieItem = ({ category }) => {
  return (
    <li className="category-item">
      <a href="#">
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

export default CategorieItem;

CategorieItem.propTypes = {
  category: PropTypes.object,
};
