import React, { useState } from "react";

import { DumbProd } from "../data/productData";
import { useParams } from "react-router-dom";
import Card from "../../shared/UIElements/Card";

import "./ProductsPurchasePage.css";
import PurchaseForm from "../components/PurchaseForm";
import SuccessPage from "../components/SuccessPage";

function ProductsPurchasePage() {
  const pid = useParams().pid;
  const product = DumbProd.find((product) => product.id === pid);

  const [success, setSuccess] = useState(false);
  const successHandler = () => {
    setSuccess(true);
    const prodIndex = DumbProd.findIndex((product) => product.id === pid);
    DumbProd[prodIndex] = { ...product, status: "reserved" };
  };
  let main;
  if (product.status === "avail") {
    main = (
      <div className="purchasePage">
        <div className="purchasePageLeft">
          <Card className="contactInfo">
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <h2>${product.price}</h2>
          </Card>
        </div>

        <div className="purchasePageRight">
          <PurchaseForm
            successHandler={successHandler}
            id={pid}
            name={product.name}
          />
        </div>
      </div>
    );
  } else {
    main = (
      <h3>
        Product is Reserved or Sold! Please have a look at our other items
      </h3>
    );
  }
  return success ? <SuccessPage /> : main;
}

export default ProductsPurchasePage;
