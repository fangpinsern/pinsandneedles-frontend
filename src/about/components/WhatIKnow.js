import React from "react";

import "./WhatIKnow.css";
import StarBar from "./StarBar";
import LoadingBar from "./LoadingBar";

//props
// numStars
// name
// icon
function WhatIKnow(props) {
  return (
    <div className="row">
      {props.icon ? (
        <div className="col-left">
          <div className="col-left-left">
            <img src={props.icon} alt="reactIcon" />
          </div>
          <div className="col-left-right">{props.name}</div>
        </div>
      ) : (
        <div className="col-left">{props.name}</div>
      )}
      <div className="col-right">
        {props.starBar && <StarBar numStars={props.numStars} />}
        {props.loadingBar && <LoadingBar done={props.done} />}
      </div>
    </div>
  );
}

export default WhatIKnow;
