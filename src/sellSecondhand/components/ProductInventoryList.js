import React from "react";
import ProductInventorySubList from "./ProductInventorySubList";

import "./ProductInventoryList.css";
// import LoadingSpinner from "../../shared/modals/LoadingSpinner";

// props
// items

function ProductInventoryList(props) {
  // const [isLoading, setIsLoading] = useState(false);
  const reserved = props.items.filter(
    (product) => product.status === "reserved"
  );
  const sold = props.items.filter((product) => product.status === "sold");
  const avail = props.items.filter((product) => product.status === "avail");

  return (
    <React.Fragment>
      <div className="inventoryList">
        <h2>Reserved</h2>
        <ProductInventorySubList list={reserved} />
        <h2>Available</h2>
        <ProductInventorySubList list={avail} />
        <h2>Sold</h2>
        <ProductInventorySubList list={sold} />
      </div>
    </React.Fragment>
  );
}

export default ProductInventoryList;
