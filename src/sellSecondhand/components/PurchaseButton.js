import React from "react";

import Button from "../../shared/FormElements/Button";

import "./PurchaseButton.css";

function PurchaseButton(props) {
  const status = props.available;
  const buttonType = (available) => {
    if (available === "avail") {
      return "Buy Now!";
    } else if (available === "reserved") {
      return "Reserved";
    } else {
      return "Sold!";
    }
  };

  const getLink = (available, id) => {
    if (available === "avail") {
      return "/products/purchase/" + id;
    }
  };

  return (
    <Button className="purchaseButton" to={getLink(status, props.id)}>
      {buttonType(status)}
    </Button>
  );
}

export default PurchaseButton;
