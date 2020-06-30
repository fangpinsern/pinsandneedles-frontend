import React from "react";
import { useForm } from "../../shared/hooks/form-hooks";
import Input from "../../shared/FormElements/Input";
import {
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/UIElements/Card";

import "./CPFCalculator.css";
import Button from "../../shared/FormElements/Button";

function IncomeCalculator(props) {
  const incomeForm = {
    dreamIncome: {
      value: 0,
      isValid: true,
    },
    age: {
      value: 0,
      isValid: false,
    },
  };

  const [formState, inputHandler] = useForm(incomeForm, true);
  const submitHandler = () => {
    props.incomeInputHandler(
      formState.inputs.dreamIncome.value,
      formState.inputs.age.value
    );
  };
  return (
    <div className="incomeCalculatorForm">
      <Card className="incomeCalculatorCard">
        <form>
          <Input
            id="dreamIncome"
            label="Expected Monthly Income (Required)"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
            element="input"
            type="number"
            placeholder="0"
            errorText="Please enter a valid postive number"
            initialValue={formState.inputs.dreamIncome.value}
            initialValid={formState.inputs.dreamIncome.isValid}
          />
          <Input
            id="age"
            label="Age"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
            element="input"
            type="number"
            placeholder="0"
            errorText="Please enter a valid postive number"
            initialValue={formState.inputs.age.value}
            initialValid={formState.inputs.age.isValid}
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
  );
}

export default IncomeCalculator;
