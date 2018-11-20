import React from "react";

export function Paragraph(props) {
  let display;
  if (!props.title) {
    display = "none";
  }

  return (
    <div className="paragraph">
      <h2 style={{ display: display }}>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  );
}

export default Paragraph;
