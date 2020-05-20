import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

// props
// inverse - colour
// danger - colour
// size - big or small

// For link out of SPA
// href - if the button links to another link outside of SPA

// For link within SPA
// to - link within SPA
// exact -  for SPA link

// For normal Button
// type - type of button (submit, button, reset)
// onClick - function pointer to function when function is clicked
// disabled - is button diabled or not (true or false)

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
