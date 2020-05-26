import React from "react";

import { DumbProd } from "../data/productData";

import "./ProductsSubPage.css";
import { useParams } from "react-router-dom";
import PurchaseButton from "../components/PurchaseButton";

function ProductsSubPage() {
  const pid = useParams().pid;

  const productData = DumbProd.find((product) => product.id === pid);

  const availabiltyHandler = (available) => {
    if (available === "avail") {
      return "Available!";
    } else if (available === "reserved") {
      return "Sorry it is reserved!";
    } else {
      return "Too slow. It is sold!";
    }
  };

  return (
    <div>
      <div className="productsSubPageHeader">
        <br />
        <h1>{productData.name}</h1>
      </div>
      <div className="productsSubPageMain">
        <div className="productsSubPageMain-left">
          <img src={productData.imageUrl} alt={productData.name} />
        </div>
        <div className="productsSubPageMain-right">
          {productData.fullProductOutline.map((outline) => {
            return (
              <div
                key={outline.key}
                className={`productsSubPageMain-${outline.type}`}
              >
                {outline.type === "image" ? (
                  <img src={outline.value} alt={outline.value} />
                ) : (
                  <p>{outline.value}</p>
                )}
              </div>
            );
          })}
          <div>
            <p>Price: ${productData.price}</p>
            <PurchaseButton available={productData.status} id={productData.id}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsSubPage;
