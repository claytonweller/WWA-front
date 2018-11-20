import React from "react";
const closeXimage = require("../../assets/images/x.png");

// This is used on both the expanded artist card as well as the modal window (when logged in)
export function CloseX(props) {
  return (
    <a
      className={`close-x ${props.className}`}
      href="none"
      onClick={e => {
        e.preventDefault();
        props.action(e);
      }}
    >
      <img src={closeXimage} alt="Close modal window" />
    </a>
  );
}

export default CloseX;
