import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/modals/ErrorModal";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";

import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Button from "../../shared/FormElements/Button";

function ProductInventorySubListItem(props) {
  const pid = props.id;
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const soldHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:3002/api/products/sold/" + pid,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>{props.name}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div>{JSON.stringify(props.reservedBy)}</div>
            <Button type="button" onClick={soldHandler}>
              Delivered
            </Button>
            {/* <Button>More Info</Button> */}
          </AccordionItemPanel>
        </AccordionItem>
      )}
    </React.Fragment>
  );
}

export default ProductInventorySubListItem;
