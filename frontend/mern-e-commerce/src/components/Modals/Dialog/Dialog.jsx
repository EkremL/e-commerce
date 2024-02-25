import React from "react";
import PropTypes from "prop-types";
import "./Dialog.css";

const Dialog = ({ isDialogShow, setIsDialogShow }) => {
  const handleCloseDialog = (event) => {
    const checked = event.target.checked;

    localStorage.setItem("dialog", JSON.stringify(!checked));
    //checkbox un check olup olmama durumuna göre tarayıcının localstoragesine kaydedilecek ve ona göre tekrar açılıp açılmma durumu gerçekleşcek
  };

  return (
    <div className={`modal-dialog ${isDialogShow ? "show" : ""} `}>
      <div className="modal-content">
        <button className="modal-close" onClick={() => setIsDialogShow(false)}>
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-image">
          <img src="/img/modal-dialog.jpg" alt="" />
        </div>
        <div className="popup-wrapper">
          <div className="popup-content">
            <div className="popup-title">
              <h3>NEWSLETTER</h3>
            </div>
            <p className="popup-text">
              Sign up to our newsletter and get exclusive deals you won find any
              where else straight to your inbox!
            </p>
            <form className="popup-form">
              <input type="text" placeholder="Enter Email Address Here" />
              <button className="btn btn-primary">SUBSCRIBE</button>
              <label>
                <input type="checkbox" onChange={handleCloseDialog} />
                <span>Dont show this popup again</span>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div
        //!dışarı tıklandığında yani outside click yapıldığında da kapatılmasını sağlıyor
        className="modal-dialog-overlay"
        onClick={() => setIsDialogShow(false)}
      ></div>
    </div>
  );
};

export default Dialog;

Dialog.propTypes = {
  isDialogShow: PropTypes.bool,
  setIsDialogShow: PropTypes.func,
};
