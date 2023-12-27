import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import Blogs from "../components/Blogs/Blogs";

const BlogPage = () => {
  return (
    <>
      <Header />
      <div className="blog-page">
        <Blogs />
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
