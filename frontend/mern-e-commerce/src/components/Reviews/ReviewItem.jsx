import React from "react";
import PropTypes from "prop-types";

const ReviewItem = ({ reviewItem }) => {
  // console.log(reviewItem);
  //aşağıda reviewItem.text ile de alabilirdik ama destructoring tercih ettik
  const { review, user } = reviewItem;
  const { text, createdAt, rating } = review;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(createdAt).toLocaleDateString(
    "tr-TR",
    options
  );

  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src={user.avatar} width={60} alt="" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {/* farkli bir kullanim  */}
          {Array.from({ length: rating }, (_, index) => {
            return (
              <li key={index}>
                <i className="bi bi-star-fill"></i>
              </li>
            );
          })}
        </ul>
        <div className="comment-meta">
          <strong> {user.username}</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;

ReviewItem.propTypes = {
  reviewItem: PropTypes.object,
};
