import React from "react";
import Card from "../../shared/UIElements/Card";
import { Accordion } from "react-accessible-accordion";

import "./accordion.css";
// import Button from "../../shared/FormElements/Button";
// import { AuthContext } from "../../shared/context/auth-context";
import ProductInventorySubListItem from "./ProductInventorySubListItem";
// import { Link } from "react-router-dom";
// props
// list
function ProductInventorySubList(props) {
  let main;

  if (props.list.length === 0) {
    main = (
      <Card>
        <h2>List is empty</h2>
      </Card>
    );
  } else {
    main = (
      <Card>
        <Accordion allowZeroExpanded="true">
          {props.list.map((product) => {
            return (
              <ProductInventorySubListItem
                key={product.id}
                id={product.id}
                name={product.name}
                reservedBy={product.reservedBy}
              />
            );
          })}
        </Accordion>
      </Card>
    );
  }
  return main;
}

export default ProductInventorySubList;
