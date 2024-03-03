import React, { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import "./Search.css";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchResults, setSearchResults] = useState(null);
  //null vermemizin nedeni 0. durumda yani ilk tıkladığımızda boş olacağı durum;  aşağıda hata vermemesi için ? 'ları ekliyoruz

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    //farkli bir yakalama yöntemi
    // console.log(e.target[0].value); // inputtaki değeri alacak
    // console.log(e.target[1]); //butonu seçecek
    const productName = e.target[0].value;

    if (productName.trim().length === 0) {
      message.warning("Boş karakter arayamazsınız!");
      return;
    }
    try {
      const res = await fetch(
        `${apiUrl}/api/products/search/${productName.trim()}`
      );

      if (!res.ok) {
        message.error("There was an error searching for products");
        return;
      }
      const data = await res.json();
      // console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchResults);
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""}`}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display:
                searchResults?.length === 0 || !searchResults ? "flex" : "grid",
            }}
          >
            {/* başlangıç yani 0 durumu */}
            {!searchResults && (
              <b
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Search product...
              </b>
            )}
            {searchResults?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                😔Aradığınız Ürün Bulunamadı😔
              </a>
            )}
            {searchResults?.length > 0 &&
              searchResults?.map(
                (
                  resultItem //başlangıç olarak null verdiğimiz için map bunu okuyamıyor biz de ? ile opsiyonellik ekledik
                ) => (
                  <a href="#" className="result-item" key={resultItem._id}>
                    <img
                      src={resultItem.img[0]}
                      className="search-thumb"
                      alt=""
                    />
                    <div className="search-info">
                      <h4>{resultItem.name}</h4>
                      <span className="search-sku">SKU: PD0016</span>
                      <span className="search-price">
                        ${resultItem.price.current.toFixed(2)}
                      </span>
                    </div>
                  </a>
                )
              )}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div
        //!dışarı tıklandığında yani outside click yapıldığında da kapatılmasını sağlıyor
        className="modal-overlay"
        onClick={handleCloseModal}
      ></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
