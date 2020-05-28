import React from "react";

import ProductItem from "./ProductItem";

import "./ProductList.css";

function ProductList(props) {
  return (
    <ul className="productList">
      {props.items
        .filter((product) => product.status === "avail")
        .map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              src={process.env.REACT_APP_BACKEND_URL + "/" + product.imageUrl}
              available={product.status}
            />
          );
        })}
    </ul>
  );
}

export default ProductList;
