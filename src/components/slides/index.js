import React from "react";
import "./cssfile.css";

const Slide = props => {
  return (
    <div className="imgContainer">
      <img src={props.image} alt="" />
      <p className="caption">{props.caption}</p>
    </div>
  );
};

export default Slide;
