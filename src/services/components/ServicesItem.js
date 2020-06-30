import React from "react";

import Card from "../../shared/UIElements/Card";

import { Link } from "react-router-dom";

import "./ServicesItem.css";

// props
// id
// src
// name
// description

function ServicesItem(props) {
  return (
    <li className="projectItem">
      <Card className="projectItemCard">
        <Link to={`/services/${props.id}`}>
          <div className="projectItemTop">
            <img src={props.src} alt={props.name} />
          </div>
          <div className="projectItemInfo">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default ServicesItem;
