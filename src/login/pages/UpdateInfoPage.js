import React, { useState, useEffect, useContext } from "react";

import "./UpdateInfoPage.css";
import { useForm } from "../../shared/hooks/form-hooks";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/FormElements/Button";
import ErrorModal from "../../shared/modals/ErrorModal";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

function UpdateInfoPage(props) {
  const auth = useContext(AuthContext);
  let updateForm = {
    username: {
      value: "",
      isValid: false,
    },
    oldPassword: {
      value: "",
      isValid: false,
    },
    newPassword: {
      value: "",
      isValid: false,
    },
  };

  const [formState, inputHandler, setFormData] = useForm(updateForm, false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  //   setIsLoading(true);

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/api/users/updateinfo/" +
            auth.userId
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        // setProjectData(resData);
        // console.log(resData);
        setFormData({
          username: {
            value: resData.user.username,
            isValid: true,
          },
          oldPassword: {
            value: "",
            isValid: false,
          },
          newPassword: {
            value: "",
            isValid: false,
          },
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message);
      }
    };
    sendReq();
    // console.log(test.username);

    // setFormData(
    //   {
    //     username: {
    //       value: auth.userId,
    //       isValid: true,
    //     },
    //     oldPassword: {
    //       value: "",
    //       isValid: false,
    //     },
    //     newPassword: {
    //       value: "",
    //       isValid: false,
    //     },
    //   },
    //   false
    // );

    // // console.log(formState);
    // setIsLoading(false);
  }, [setFormData, auth.userId]);

  //   console.log(formState);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const username = formState.inputs.username.value;
    const oldPassword = formState.inputs.oldPassword.value;
    const newPassword = formState.inputs.newPassword.value;

    const formObj = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    // console.log(formObj);
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/api/users/updateinfo/" +
          auth.userId,
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
      console.log(responseData);
      setIsLoading(false);
      auth.login(responseData.userId, responseData.token);
      //   setResId(responseData.project.id);
      //   setSubmitted(true);
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && (
        <div className="signupForm">
          <Card className="signupCard">
            <form onSubmit={formSubmitHandler}>
              <Input
                id="username"
                label="Username"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                element="input"
                type="text"
                placeholder="Username"
                errorText="Please enter a username"
                initialValue={formState.inputs.username.value}
                initialValid={formState.inputs.username.isValid}
              />
              <Input
                id="oldPassword"
                label="Old Password"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                element="input"
                type="password"
                placeholder="Old Password"
                errorText="Please enter your old password"
                initialValue={formState.inputs.oldPassword.value}
                initialValid={formState.inputs.oldPassword.isValid}
              />
              <Input
                id="newPassword"
                label="New Password"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                element="input"
                type="password"
                placeholder="New Password"
                errorText="Please enter your new password"
                initialValue={formState.inputs.newPassword.value}
                initialValid={formState.inputs.newPassword.isValid}
              />
              <Button type="submit" disabled={!formState.isValid}>
                Update
              </Button>
            </form>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
}

export default UpdateInfoPage;
