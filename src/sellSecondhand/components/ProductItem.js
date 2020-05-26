import React from "react";

import "./ProductItem.css";
import Card from "../../shared/UIElements/Card";
import { Link } from "react-router-dom";
import PurchaseButton from "./PurchaseButton";

// props
// id
// src
// name
// description
// price
// available

function ProductItem(props) {
  return (
    <li className="productItem">
      <Card className="productItemCard">
        <Link to={`/products/${props.id}`}>
          <div className="productItemTop">
            <img src={props.src} alt={props.name} />
          </div>
          <div className="productItemInfo">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>${props.price}</p>
            <p>{props.available}</p>
          </div>
        </Link>
        <div className="productItemPurchaseButton">
          <PurchaseButton available={props.available} id={props.id} />
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
