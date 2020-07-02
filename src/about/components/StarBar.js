import React from "react";

import "./StarBar.css";

function StarBar(props) {
  let numStars = props.numStars;
  const dummyArray = [1, 2, 3, 4, 5];
  return (
    <div>
      {dummyArray.map((dumb) => {
        numStars = numStars - 1;
        if (numStars >= 0) {
          return <span key={dumb} className="fa fa-star fa-2x checked"></span>;
        }
        return <span key={dumb} className="fa fa-star fa-2x"></span>;
      })}
    </div>
  );
}

export default StarBar;
