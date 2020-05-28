import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

import PurchaseButton from "../components/PurchaseButton";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";

import { useParams } from "react-router-dom";

import "./ProductsSubPage.css";

function ProductsSubPage() {
  const pid = useParams().pid;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [productData, setProductData] = useState();

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/api/products/" + pid
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setProductData(resData.product);
        console.log(resData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message);
      }
    };
    sendReq();
  }, [pid]);

  if (error) {
    return (
      <div className="projectSubPageHeaderError">
        <h1>{error.message}</h1>
      </div>
    );
  }

  !isLoading &&
    productData &&
    console.log(process.env.REACT_APP_BACKEND_URL + productData.imageUrl);
  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && productData && (
        <div>
          <div className="productsSubPageHeader">
            <br />
            <h1>{productData.name}</h1>
          </div>
          <div className="productsSubPageMain">
            <div className="productsSubPageMain-left">
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL + "/" + productData.imageUrl
                }
                alt={productData.name}
              />
            </div>
            <div className="productsSubPageMain-right">
              {parse(productData.fullProductOutline)}
              <div>
                <p>Price: ${productData.price}</p>
                <PurchaseButton
                  available={productData.status}
                  id={productData.id}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ProductsSubPage;
