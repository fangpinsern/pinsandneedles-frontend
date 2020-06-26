import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "../../shared/UIElements/Card";
import PurchaseForm from "../components/PurchaseForm";
import SuccessPage from "../components/SuccessPage";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";

import "./ProductsPurchasePage.css";

function ProductsPurchasePage() {
  const pid = useParams().pid;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [product, setProduct] = useState();
  const [success, setSuccess] = useState(false);

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
        setProduct(resData.product);
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

  const successHandler = async (buyerInfo) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/products/purchase/" + pid,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buyerInfo),
        }
      );
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.msg);
      }
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message);
    }
  };

  const loadHandler = () => {
    setIsLoading(true);
  };

  if (error) {
    return (
      <div className="projectSubPageHeaderError">
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      {success && <SuccessPage />}
      {!success && isLoading && <LoadingSpinner asOverlay />}
      {!success && !isLoading && product && product.status === "avail" ? (
        <div className="purchasePage">
          <div className="purchasePageLeft">
            <Card className="purchasePageInfo">
              <h1>{product.name}</h1>
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL + "/" + product.imageUrl[0]
                }
                alt={product.name}
              />
              <p>{product.description}</p>
              <h2>${product.price}</h2>
            </Card>
          </div>

          <div className="purchasePageRight">
            <PurchaseForm
              successHandler={successHandler}
              id={pid}
              name={product.name}
              loadHandler={loadHandler}
            />
          </div>
        </div>
      ) : (
        !success &&
        !isLoading && (
          <h3>
            Product is Reserved or Sold! Please have a look at our other items
          </h3>
        )
      )}
    </React.Fragment>
  );
}

export default ProductsPurchasePage;
