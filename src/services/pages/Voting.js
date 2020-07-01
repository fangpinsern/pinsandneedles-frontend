import React, { useState } from "react";

import "./Voting.css";
import { useForm } from "../../shared/hooks/form-hooks";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
  VALIDATOR_YESORNO,
} from "../../shared/util/validators";
import Button from "../../shared/FormElements/Button";
import VotingBasics from "../components/VotingBasics";

function Voting() {
  const [validAge, setValidAge] = useState(false);
  const [singaporean, setSingaporean] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ageTillValid, setAgeTillValid] = useState(0);
  const [userAge, setUserAge] = useState(0);
  const ageForm = {
    age: {
      value: 0,
      isValid: false,
    },
    singaporean: {
      value: "",
      isValid: false,
    },
  };
  const [formState, inputHandler] = useForm(ageForm, false);

  const submitHandler = () => {
    setUserAge(formState.inputs.age.value);
    if (formState.inputs.age.value >= 21) {
      setValidAge(true);
    } else {
      setValidAge(false);
      setAgeTillValid(21 - formState.inputs.age.value + 2020);
    }

    if (formState.inputs.singaporean.value.toLowerCase() === "yes") {
      setSingaporean(true);
    } else {
      setSingaporean(false);
    }
    setSubmitted(true);
  };

  let details;

  if (submitted) {
    if (validAge && singaporean) {
      details = <VotingBasics age={userAge} />;
    } else if (validAge && !singaporean) {
      details = (
        <h2>
          Sadly you are only allowed to vote if you are a Singapore citizen.
          <br />
          Permanent Residents are not allowed to vote.
        </h2>
      );
    } else if (!validAge && singaporean) {
      details = (
        <h2>
          Sadly you are only allowed to vote in elections held after{" "}
          {ageTillValid}
        </h2>
      );
    } else {
      details = (
        <h2>
          Sadly you are only allowed to vote if you are a Singapore citizen.
          <br />
          Permanent Residents are not allowed to vote.
          <br />
          If you become a Singaporean citizen after {ageTillValid}, then you
          will be able to vote :)
        </h2>
      );
    }
  }
  return (
    <React.Fragment>
      <div className="votingHeader">
        <h1>Voting Basics</h1>
        <p>First time voting? Same.</p>
        <p>How to make it count? Or don't.</p>
      </div>
      <div className="votingForm">
        <Card className="votingCard">
          <form>
            <Input
              id="age"
              label="Age (as of 1st March 2020)"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              element="input"
              type="number"
              placeholder="0"
              errorText="Please enter a valid postive age"
              initialValue={formState.inputs.age.value}
              initialValid={formState.inputs.age.isValid}
            />
            <Input
              id="singaporean"
              label="Singaporean? (PR no count)"
              onInput={inputHandler}
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_YESORNO(formState.inputs.singaporean.value),
              ]}
              element="input"
              type="text"
              placeholder="yes/no"
              errorText="Please enter a 'yes' or 'no' only"
              initialValue={formState.inputs.singaporean.value}
              initialValid={formState.inputs.singaporean.isValid}
            />

            <Button
              type="button"
              disabled={!formState.isValid}
              onClick={submitHandler}
            >
              Calculate
            </Button>
          </form>
        </Card>
      </div>
      <div className="votingMain">{details}</div>
    </React.Fragment>
  );
}

export default Voting;
