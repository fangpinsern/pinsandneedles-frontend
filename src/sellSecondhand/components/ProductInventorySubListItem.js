import React, { useContext, useState } from "react";

import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import ErrorModal from "../../shared/modals/ErrorModal";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import Button from "../../shared/FormElements/Button";

import { AuthContext } from "../../shared/context/auth-context";

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
        process.env.REACT_APP_BACKEND_URL + "/api/products/sold/" + pid,
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
      window.location.reload(false);
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
