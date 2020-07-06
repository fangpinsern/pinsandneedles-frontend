import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validators";

//props
// onClear
// submitHandler
// formName
// showModal
// onClear
// form
// inputHandler
// formState

const FormModal = (props) => {
  const form = props.form;
  const formState = props.formState;
  return (
    <Modal
      onCancel={props.onClear}
      onSubmit={props.submitHandler}
      header={props.formName}
      show={!!props.showModal}
      footer={
        <React.Fragment>
          <Button onClick={props.onClear}>Cancel</Button>
        </React.Fragment>
      }
    >
      {Object.keys(form).map((input) => {
        return (
          <Input
            key={input}
            id={input}
            label={form[input].label}
            onInput={props.inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            element="input"
            type="text"
            placeholder=""
            errorText="This field is required"
            initialValue={formState.inputs[input].value}
            initialValid={formState.inputs[input].isValid}
          />
        );
      })}
      <Button type="submit" disabled={!formState.isValid}>
        Add Task
      </Button>
    </Modal>
  );
};

export default FormModal;
