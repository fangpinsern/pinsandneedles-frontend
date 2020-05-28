import React, { useEffect, useState } from "react";

// import { DumbProd } from "../data/productData";

import "./ProductsMainPage.css";
import ProductList from "../components/ProductList";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import ErrorModal from "../../shared/modals/ErrorModal";

function ProductsMainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedProduct, setLoadedProduct] = useState();
  useEffect(() => {
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/api/products"
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setLoadedProduct(resData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <div className="homeHeader">
        <h1>Products</h1>
      </div>
      {!isLoading && loadedProduct && (
        <div className="projectRow">
          <ProductList items={loadedProduct.products} />
        </div>
      )}
    </React.Fragment>
  );
}
export default ProductsMainPage;
