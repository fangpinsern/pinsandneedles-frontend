import React, { useState, useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import ErrorModal from "../../shared/modals/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hooks";

function ProjectUpdatePage(props) {
  const auth = useContext(AuthContext);
  const pid = useParams().pid;
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

  const [formState, inputHandler, setFormData] = useForm(
    projectInputForm,
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  // const [projectData, setProjectData] = useState();
  const [error, setError] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [resId, setResId] = useState("");

  // get existing project by pid

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/api/projects/" + pid
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        // setProjectData(resData);
        // console.log(resData);
        setFormData({
          title: {
            type: "string",
            value: resData.project.title,
            isValid: true,
          },
          imageUrl: {
            type: "image",
            value: resData.project.imageUrl,
            isValid: true,
          },
          description: {
            type: "string",
            value: resData.project.description,
            isValid: true,
          },
          fullProjectOutline: {
            type: "string",
            value: resData.project.fullProjectOutline,
            isValid: true,
          },
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err);
      }
    };
    sendReq();
  }, [pid, setFormData]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const title = formState.inputs.title.value;
    const imageUrl = formState.inputs.imageUrl.value;
    const description = formState.inputs.description.value;
    const fullOutlineRaw = document.getElementById("fullProjectOutline").value;

    const formObj = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      fullProjectOutline: fullOutlineRaw,
    };
    // console.log(formObj);
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/projects/" + pid,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify(formObj),
        }
      );

      // console.log(response.body);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg);
      }
      // console.log("Iamhere");
      //   console.log(responseData);
      setIsLoading(false);
      setResId(responseData.project.id);
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.msg || "Something went wrong, please try again");
    }

    // DumbProj.push(finalObj);
  };

  const errorHandler = () => {
    setError(null);
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }
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

export default ProjectUpdatePage;
