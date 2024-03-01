import React, { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

const ReviewForm = ({ singleProduct }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  //usere local storageden ulaşma ve idsini alma
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleRatingChange = (e, newRating) => {
    e.preventDefault();
    setRating(newRating);
  };
  // console.log(review);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      //modele uygun şekilde datayı alacağız
      reviews: [
        ...singleProduct.reviews,
        {
          text: review,
          rating: parseInt(rating),
          user: user.id, //localden aldığımız userin idsine ulaşıyoruz
        },
      ],
    };

    try {
      const res = await fetch(`${apiUrl}/api/products/${singleProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        message.error("There was an error adding review");
        return;
      }

      const data = await res.json();
      console.log(data);
      //formu sıfırlama
      setRating(0); //bunun işlemesi için textareaya value verdik
      setReview("");
      console.log(formData);
      message.success("Review is added successfully");
    } catch (error) {
      console.log(error);
      message.error("There was an error adding review");
    }
  };
  // console.log(singleProduct);

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          <a
            href="#"
            className={`star ${rating === 1 && "active"}`}
            onClick={(e) => handleRatingChange(e, 1)}
          >
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 2 && "active"}`}
            onClick={(e) => handleRatingChange(e, 2)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 3 && "active"}`}
            onClick={(e) => handleRatingChange(e, 3)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 4 && "active"}`}
            onClick={(e) => handleRatingChange(e, 4)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            href="#"
            className={`star ${rating === 5 && "active"}`}
            onClick={(e) => handleRatingChange(e, 5)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        ></textarea>
      </div>
      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Save my name, email, and website in this browser for the next time I
          comment.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
};

export default ReviewForm;

ReviewForm.propTypes = {
  singleProduct: PropTypes.object,
};
