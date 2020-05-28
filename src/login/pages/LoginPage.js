import React, { useContext, useState } from "react";

import Card from "../../shared/UIElements/Card";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import ErrorModal from "../../shared/modals/ErrorModal";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";

import { useForm } from "../../shared/hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import "./LoginPage.css";

function LoginPage() {
  const auth = useContext(AuthContext);
  let loginForm = {
    username: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  };

  const [formState, inputHandler] = useForm(loginForm, false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
          }),
        }
      );
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.msg);
      }
      setIsLoading(false);
      auth.login(resData.userId, resData.token);
      // console.log(resData.token);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && (
        <div className="loginForm">
          <Card className="loginCard">
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
                id="password"
                label="Password"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                element="input"
                type="password"
                placeholder="Password"
                errorText="Please enter a password"
                initialValue={formState.inputs.password.value}
                initialValid={formState.inputs.password.isValid}
              />
              <Button type="submit" disabled={!formState.isValid}>
                Login
              </Button>
            </form>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
}

export default LoginPage;
