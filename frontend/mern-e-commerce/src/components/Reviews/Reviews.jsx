import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import { message } from "antd";
import "./Reviews.css";

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
  //reviews içinde zaten modelde kullanıcı idyi alıyorduk çünkü ilişkili veritabanı kullanmıstık, şimdi ise kullanıcı bilgilerini çekip statik yerleri dinamik hale çekmeliyiz
  const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const thisReview = [];

  //?fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Çekme işlemi başarisiz");
        }
      } catch (error) {
        console.log("Çekme hatasi", error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  // console.log(users);

  //farklı bir filter yöntemi (çok kullanılmaz)

  singleProduct.reviews.forEach((review) => {
    // ?'ni data yoksa aramasın diye belirtiyoruz
    const matchingUsers = users?.filter((user) => user._id === review.user);

    matchingUsers.forEach((matchingUser) => {
      thisReview.push({
        review: review,
        user: matchingUser,
      });
    });
  });

  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {/* {singleProduct.reviews.map((item, index) => (
                <ReviewItem key={index} reviewItem={item} />
              ))} */}
              {/* dinamik olarak reviewi almak için bir prop daha geçiyorz adı reviewitem */}
              {/* //artik kullanıcıları kullandığımız yöntemle çekeceğiz yani maplamayı değiştirdik */}

              {thisReview.map((item, index) => (
                <ReviewItem key={index} reviewItem={item} />
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
        <ReviewForm
          setSingleProduct={setSingleProduct}
          singleProduct={singleProduct}
        />
      </div>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  active: PropTypes.string,
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
