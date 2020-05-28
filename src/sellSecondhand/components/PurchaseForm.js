import React from "react";
import axois from "axios";

import "./PurchaseForm.css";

import { useForm } from "../../shared/hooks/form-hooks";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMBER,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
// import ErrorModal from "../../shared/modals/ErrorModal";

function PurchaseForm(props) {
  const pid = props.id;
  const productName = props.name;
  let contactForm = {
    name: {
      value: "",
      isValid: false,
    },
    contactNumber: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    address: {
      value: "",
      isValid: false,
    },
    postalCode: {
      value: "",
      isValid: false,
    },
    additionalNotes: {
      value: "",
      isValid: true,
    },
  };
  const [formstate, inputHandler] = useForm(contactForm, false);
  // const [isLoading, setIsLoading] = useState(false);
  // const resetForm = () => {
  //   window.location.reload();
  // };
  const contactFormSubmitHandler = (event) => {
    event.preventDefault();
    props.loadHandler();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const address = document.getElementById("address").value;
    const postalCode = document.getElementById("postalCode").value;
    const additionalNotes = document.getElementById("additionalNotes").value;

    const buyerInfo = {
      name: name,
      email: email,
      contactNumber: contactNumber,
      address: address,
      postalCode: postalCode,
      additionalNotes: additionalNotes,
      productName: productName,
    };

    axois({
      method: "POST",
      url: "http://localhost:3002/send",
      data: {
        type: "purchase",
        name: name,
        email: email,
        contactNumber: contactNumber,
        address: address,
        postalCode: postalCode,
        additionalNotes: additionalNotes,
        productName: productName,
        pid: pid,
      },
    }).then((res) => {
      if (res.data.msg === "success") {
        // alert("Thank you for your purchase!");
        props.successHandler(buyerInfo);
      } else if (res.data.msg === "fail") {
        alert(
          "Question failed to send due to some technical error. Please try again"
        );
      }
    });

    // props.successHandler(buyerInfo);
  };

  return (
    <form className="contact-form" onSubmit={contactFormSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={formstate.inputs.name.value}
        initialValid={formstate.inputs.name.isValid}
      />
      <Input
        id="contactNumber"
        element="input"
        type="text"
        label="Contact Number"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
        errorText="Please enter a valid contact handphone number."
        onInput={inputHandler}
        initialValue={formstate.inputs.contactNumber.value}
        initialValid={formstate.inputs.contactNumber.isValid}
      />
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
        initialValue={formstate.inputs.email.value}
        initialValid={formstate.inputs.email.isValid}
      />
      <Input
        id="address"
        element="textarea"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
        initialValue={formstate.inputs.address.value}
        initialValid={formstate.inputs.address.isValid}
      />
      <Input
        id="postalCode"
        element="input"
        type="text"
        label="Postal Code"
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MAXLENGTH(6),
          VALIDATOR_MINLENGTH(6),
        ]}
        errorText="Please enter a valid postal code."
        onInput={inputHandler}
        initialValue={formstate.inputs.postalCode.value}
        initialValid={formstate.inputs.postalCode.isValid}
      />
      <Input
        id="additionalNotes"
        element="textarea"
        type="text"
        label="Additional Notes"
        validators={[]}
        onInput={inputHandler}
        initialValue={formstate.inputs.additionalNotes.value}
        initialValid={formstate.inputs.additionalNotes.isValid}
      />
      <Button type="submit" disabled={!formstate.isValid}>
        Submit
      </Button>
    </form>
  );
}

export default PurchaseForm;
