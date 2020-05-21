import React from "react";

import "./HomeCard.css";
import Card from "../../shared/UIElements/Card";

//props
// src - image source
// title - word on image
// description - words at the bottom part of the card
// link - link the card brings the user to (relative link)
// download - whether the card will download thinks or not
// newTab - open in new Tab or not

function HomeCard(props) {
  return (
    <div className="cardLink">
      <a
        href={props.link}
        target={"_blank" && props.newTab}
        rel="noopener noreferrer"
        download={props.download}
      >
        <Card className="homeCard">
          <div className="homeCardTop">
            <img src={props.src} alt="There is suppose to be something here" />
            <div className="wordInImage">{props.title}</div>
          </div>
          <div className="homeCardBottom">
            <p>{props.description}</p>
          </div>
        </Card>
      </a>
    </div>
  );
}

export default HomeCard;
