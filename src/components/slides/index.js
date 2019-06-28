import React from "react";
import "./cssfile.css";

const Slide = props => {
  let { currIndex, currSlide, nextSlide, slideClass } = props;
  return (
    <div
      className={`imgContainer ${
        props.index === currSlide ? slideClass.current : ""
      } ${props.index === nextSlide ? slideClass.next : ""}`}
      style={{ opacity: `${props.index === currIndex ? "1" : "0"}` }}
      onTouchStart={() => {
        clearInterval(props.timer);
        props.setAutoplay();
        props.moveImage(currIndex + 1);
      }}
    >
      <img src={props.image} alt="" />
      <p className="caption">{props.caption}</p>
    </div>
  );
};

export default Slide;
