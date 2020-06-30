import React, { useState, useContext } from "react";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import ErrorModal from "../../shared/modals/ErrorModal";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

function ProjectInputPage(props) {
  const auth = useContext(AuthContext);

  let projectInputForm = {
    title: {
      type: "string",
      value: "",
      isValid: false,
    },
    imageUrl: {
      type: "image",
      value: "",
      isValid: false,
    },
    description: {
      type: "string",
      value: "",
      isValid: false,
    },
    fullProjectOutline: {
      type: "string",
      value: "",
      isValid: false,
    },
  };

  const [formState, inputHandler] = useForm(projectInputForm, false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [resId, setResId] = useState("");

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const title = formState.inputs.title.value;
    const imageUrl = formState.inputs.imageUrl.value;
    const description = formState.inputs.description.value;
    const fullOutlineRaw = formState.inputs.fullProjectOutline.value;

    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            title: title,
            description: description,
            imageUrl: imageUrl,
            fullProjectOutline: fullOutlineRaw,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg);
      }
      // console.log(responseData);
      setIsLoading(false);
      setResId(responseData.project.id);
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.msg || "Something went wrong, please try again");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (submitted) {
    return (
      <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && resId && <Redirect to={"/projects/" + resId} />}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="projectInput" onSubmit={formSubmitHandler}>
        <Input
          id="title"
          label="Title"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          type="text"
          placeholder="Title"
          errorText="Please enter a title"
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
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
          id="fullProjectOutline"
          label="Full Project Outline"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          element="textArea"
          type="text"
          placeholder="Full Outline"
          errorText="Please enter something"
          initialValue={formState.inputs.fullProjectOutline.value}
          initialValid={formState.inputs.fullProjectOutline.isValid}
          rows={10}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}

export default ProjectInputPage;
