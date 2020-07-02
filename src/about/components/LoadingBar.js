import React, { useState } from "react";

import "./LoadingBar.css";
function LoadingBar(props) {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${props.done}%`,
      fontSize: "12px",
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {props.done}%
      </div>
    </div>
  );
}

export default LoadingBar;
