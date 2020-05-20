import React from "react";

import './Contact.css';

import ContactUs from "../components/ContactUs";
function Contact() {
  return (
    <React.Fragment>
      <div className="contactHeader">
        <h1>Contact Us</h1>
      </div>
      <div className="contactUs">
        <div className="contactUsLeft">
            <p>Email: pinsernfang@gmail.com</p>
            <p> <a href='https://github.com/fangpinsern'>GitHub</a> </p>
            <p> <a href='https://www.linkedin.com/in/pin-sern-fang-689539191/'>LinkedIn</a> </p>
        </div>

        <div className="contactUsRight">
          <ContactUs />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contact;
