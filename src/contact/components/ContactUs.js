import React from "react";
import axois from "axios";

import { useForm } from "../../shared/hooks/form-hooks";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";

import "./ContactUs.css";

function ContactUs() {
  let contactForm = {
    name: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    question: {
      value: "",
      isValid: false,
    },
  };
  const [formstate, inputHandler] = useForm(contactForm, false);

  const resetForm = () => {
    window.location.reload();
  };
  const contactFormSubmitHandler = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const question = document.getElementById("question").value;

    axois({
      method: "POST",
      url: process.env.REACT_APP_BACKEND_URL + "/send",
      data: {
        type: "contact",
        name: name,
        email: email,
        question: question,
      },
    }).then((res) => {
      if (res.data.msg === "success") {
        alert("I will get back to you as soon as possible!");
        resetForm();
      } else if (res.data.msg === "fail") {
        alert(
          "Question failed to send due to some technical error. Please try again"
        );
      }
    });
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
        id="question"
        element="textarea"
        type="text"
        label="Question"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid question."
        onInput={inputHandler}
        initialValue={formstate.inputs.question.value}
        initialValid={formstate.inputs.question.isValid}
      />
      <Button type="submit" disabled={!formstate.isValid}>
        Submit
      </Button>
    </form>
  );
}

export default ContactUs;
