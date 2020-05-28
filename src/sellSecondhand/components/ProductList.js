import React from "react";

import "./ProductList.css";
import ProductItem from "./ProductItem";

function ProductList(props) {
  return (
    <ul className="projectList center">
      {props.items.map((product) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            src={"http://localhost:3002/"+product.imageUrl}
            available={product.status}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
