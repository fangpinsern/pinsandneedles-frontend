import React from "react";

import "./SlideShowImage";

// props
// id
// src
function SlideShowImage(props) {
  return (
    <div id={props.id} className="fade">
      {/* <div className="numbertext">1/3</div> */}
      <img src={props.src} alt={props.id} style={{ width: "100%" }} />
      {/* <div className="text">Caption Text</div> */}
    </div>
  );
}

export default SlideShowImage;
