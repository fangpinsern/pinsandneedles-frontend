import React, { useState, useEffect } from "react";
// import { DumbProd } from "../data/productData";
import ProductInventoryList from "../components/ProductInventoryList";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import ErrorModal from "../../shared/modals/ErrorModal";

function ProductsInventory() {
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
      {!isLoading && loadedProduct && (
        <ProductInventoryList items={loadedProduct.products} />
      )}
    </React.Fragment>
  );
}

export default ProductsInventory;
