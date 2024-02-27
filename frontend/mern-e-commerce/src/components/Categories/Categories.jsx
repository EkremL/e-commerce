import React, { useEffect, useState } from "react";
import CategorieItem from "./CategorieItem";
import { message } from "antd";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Çekme işlemi başarisiz");
        }
      } catch (error) {
        console.log("Çekme hatasi", error);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {/* <CategorieItem />
          <CategorieItem />
          <CategorieItem />
          <CategorieItem />
          <CategorieItem /> */}
          {/* artik fetch ile kategorileri çekiyoruz  */}
          {categories.map((category) => (
            <CategorieItem key={category._id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
