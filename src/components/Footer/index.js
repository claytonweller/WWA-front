import React from "react";
import "./Footer.css";

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-left">
        Something not working right?{" "}
        <a
          href="mailto: clayton.weller@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shoot me an email!
        </a>
      </div>
      <div className="footer-right">
        Created By <span style={{ fontSize: "1.2em" }}>Clayton Weller</span>
      </div>
    </div>
  );
}
