import React from 'react';

import './Card.css';

const Card = props => {
  // checking if workign on new computer
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;