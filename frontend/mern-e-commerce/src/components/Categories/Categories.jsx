import React from "react";
import "./Categories.css";
import CategorieItem from "./CategorieItem";

const Categories = () => {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          <CategorieItem />
          <CategorieItem />
          <CategorieItem />
          <CategorieItem />
          <CategorieItem />
          <CategorieItem />
        </ul>
      </div>
    </section>
  );
};

export default Categories;
