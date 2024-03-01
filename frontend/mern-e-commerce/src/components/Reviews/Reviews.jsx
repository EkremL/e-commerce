import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import "./Reviews.css";

const Reviews = ({ active, singleProduct }) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {singleProduct.reviews.map((item, index) => (
                <ReviewItem key={index} item={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <>
          <h3>İlk yorum yapan siz olun </h3>
          <hr />
        </>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm singleProduct={singleProduct} />
      </div>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  active: PropTypes.string,
  singleProduct: PropTypes.object,
};
