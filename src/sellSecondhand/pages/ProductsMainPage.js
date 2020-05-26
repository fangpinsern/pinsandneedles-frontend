import React from "react";

import { DumbProd } from "../data/productData";

import "./ProductsMainPage.css";
import ProductList from "../components/ProductList";

function ProductsMainPage() {
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>Products</h1>
      </div>
      <div className="projectRow">
        <ProductList items={DumbProd} />
      </div>
    </React.Fragment>
  );
}
export default ProductsMainPage;
