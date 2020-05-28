import React from "react";

import { Accordion } from "react-accessible-accordion";

import Card from "../../shared/UIElements/Card";
import ProductInventorySubListItem from "./ProductInventorySubListItem";

import "./accordion.css";

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
