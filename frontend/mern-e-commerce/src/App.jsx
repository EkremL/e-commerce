import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import AuthPage from "./Pages/AuthPage";
import ShopPage from "./Pages/ShopPage";
import ContactPage from "./Pages/ContactPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import BlogPage from "./Pages/BlogPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import UserPage from "./Pages/Admin/UserPage";
import CategoryPage from "./Pages/Admin/Categories/CategoryPage";
import "./App.css";
import UpdateCategoryPage from "./Pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./Pages/Admin/Categories/CreateCategoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        {/* adminden sonra gelcek tüm routeleri kapsamak için böyle bir kullanim tercih ettik */}
        <Route path="/admin/*">
          <Route path="users" element={<UserPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route
            path="categories/update/:id"
            element={<UpdateCategoryPage />}
          />
          <Route path="categories/create" element={<CreateCategoryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
