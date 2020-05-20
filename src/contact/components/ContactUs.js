import React from 'react';

import "./ContactUs.css";

import { useForm } from '../../shared/hooks/form-hooks';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../shared/util/validators';


function ContactUs() {
    let contactForm = {
        name: {
            value: "",
            isValid: false
        },
        email: {
            value: "",
            isValid: false
        },
        question: {
            value: "",
            isValid: false
        }
    }
    const [formstate, inputHandler] = useForm(contactForm, false);

    return (
        <form className="contact-form">
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
                row={5}
            />
            <Button type='button'>Submit</Button>
        </form>
    )
}

export default ContactUs;