import React from "react";

import "./Contact.css";

import ContactUs from "../components/ContactUs";
import Card from "../../shared/UIElements/Card";
function Contact() {
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>Contact Us</h1>
      </div>
      <div className="contactUs">
        <div className="contactUsLeft">
          <Card className="contactInfo">
            <h1>Contact Information</h1>
            <p>Email: pinsernfang@gmail.com</p>
            <p>
              <a href="https://github.com/fangpinsern">GitHub</a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/pin-sern-fang-689539191/">
                LinkedIn
              </a>
            </p>
          </Card>
        </div>

        <div className="contactUsRight">
          <ContactUs />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contact;
