import React, { useEffect, useState } from "react";
// import productsData from "../../../data.json";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./Gallery.css";

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const Gallery = ({ singleProduct }) => {
  //data.json dan resmi çektik
  const [activeImg, setActiveImg] = useState({
    // img: productsData[0].img.singleImage,
    //!artik veritabanından fetch eiyourz
    // img: singleProduct.img[0],
    img: "",
    imgIndex: 0,
  });

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  useEffect(() => {
    setActiveImg({ img: singleProduct.img[0], imgIndex: 0 });
  }, [singleProduct.img]); //search komponentinde ürüne tıkladığımızda görsellerin değişmesini istediğimiz için yaptık

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        {/* <img src={`/${activeImg.img}`} id="single-image" alt="" /> */}
        {/* !fetch sonrasi / 'ı kaldırdık */}
        <img src={`${activeImg.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {/* {productsData[0].img.thumbs.map((itemImg, index) => ( */}
              {/* //fetch sonrasi */}
              {singleProduct.img.map((itemImg, index) => (
                <li
                  className="glide__slide glide__slide--active"
                  key={index}
                  onClick={() =>
                    setActiveImg({
                      // img: productsData[0].img.thumbs[index],
                      //!fetch sonrasi
                      img: itemImg,
                      imgIndex: index,
                    })
                  }
                >
                  <img
                    // src={`/${itemImg}`}
                    //route işleminde resmi alabilmek icin basina geçici olarak / ekledik
                    //fetchten sonra kaldirdik
                    src={`${itemImg}`}
                    alt=""
                    className={`img-fluid ${
                      activeImg.imgIndex === index ? "active" : ""
                    } `}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

Gallery.propTypes = {
  singleProduct: PropTypes.object,
};
