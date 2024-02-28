import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  // const params = useParams();
  // console.log(params);  normal kullanim

  const { id: productId } = useParams();
  // console.log(productId); //alternatif kullanim

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [singleProduct, setsingleProduct] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        //idye ulaşmak icin useparams kullandık
        const response = await fetch(`${apiUrl}/api/products/${productId}`);
        //farklı bir hata yazdırma işlemi
        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }
        const data = await response.json();
        setsingleProduct(data);
      } catch (error) {
        console.log("Çekme hatasi", error);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);

  // console.log(singleProduct);
  return singleProduct ? (
    <ProductDetails singleProduct={singleProduct} />
  ) : (
    <p>Product Loading</p>
  );
};

export default ProductDetailsPage;
