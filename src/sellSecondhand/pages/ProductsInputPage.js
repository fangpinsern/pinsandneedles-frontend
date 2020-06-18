import React, { useContext, useState } from "react";

import { Redirect } from "react-router-dom";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import ImageUpload from "../../shared/FormElements/ImageUpload";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import ErrorModal from "../../shared/modals/ErrorModal";

import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

function ProductsInputPage() {
  const auth = useContext(AuthContext);
  let productsInputForm = {
    name: {
      type: "string",
      value: "",
      isValid: false,
    },
    description: {
      type: "string",
      value: "",
      isValid: false,
    },
    imageUrl: {
      type: "string",
      value: "",
      isValid: false,
    },
    image: {
      type: "image",
      value: null,
      isValid: false,
    },
    fullProductOutline: {
      type: "string",
      value: "",
      isValid: false,
    },
    price: {
      type: "string",
      value: "",
      isValid: false,
    },
  };

  const [formState, inputHandler] = new useForm(productsInputForm, false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [resId, setResId] = useState("");

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    // testing something out 2
    // const newProduct = {
    //   name: formState.inputs.name.value,
    //   description: formState.inputs.description.value,
    //   imageUrl: formState.inputs.imageUrl.value,
    //   image: formState.inputs.image.value,
    //   fullProductOutline: formState.inputs.fullProductOutline.value,
    //   price: formState.inputs.price.value,
    //   status: "avail",
    // };

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("imageUrl", formState.inputs.imageUrl.value);
      formData.append(
        "fullProductOutline",
        formState.inputs.fullProductOutline.value
      );
      formData.append("price", formState.inputs.price.value);
      formData.append("status", "avail");
      formData.append("image", formState.inputs.image.value);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/products",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg);
      }
      console.log(responseData);
      setIsLoading(false);
      setResId(responseData.product.id);
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again");
    }
    // console.log(newProduct);
  };

  const errorHandler = () => {
    setError(null);
  };

  if (submitted) {
    return (
      <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && resId && <Redirect to={"/products/" + resId} />}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="productInputHeader">
        <h1>productInput</h1>
      </div>
      <form className="productInput" onSubmit={formSubmitHandler}>
        <Input
          id="name"
          label="Name"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          type="text"
          placeholder="Name"
          errorText="Please enter a name"
          initialValue={formState.inputs.name.value}
          initialValid={formState.inputs.name.isValid}
        />
        <ImageUpload id="image" onInput={inputHandler} />
        <Input
          id="imageUrl"
          label="Image URL"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          type="text"
          placeholder="Image URL"
          errorText="Please enter a valid URL"
          initialValue={formState.inputs.imageUrl.value}
          initialValid={formState.inputs.imageUrl.isValid}
        />
        <Input
          id="description"
          label="Description"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          type="text"
          placeholder="Description"
          errorText="Please enter a description"
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Input
          id="fullProductOutline"
          label="Full Product Outline"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          element="textArea"
          type="text"
          placeholder="Full Outline"
          errorText="Please enter something"
          initialValue={formState.inputs.fullProductOutline.value}
          initialValid={formState.inputs.fullProductOutline.isValid}
          rows={10}
        />
        <Input
          id="price"
          label="Price"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          type="text"
          placeholder="Price"
          errorText="Please enter a price"
          initialValue={formState.inputs.price.value}
          initialValid={formState.inputs.price.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Product
        </Button>
      </form>
    </React.Fragment>
  );
}

export default ProductsInputPage;
