import React, { Component } from "react";
import "./cssfile.css";
import Slide from "../slides";

/*
"https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg"
*/
var timer;
class Carousel extends Component {
  componentDidMount() {
    let w = window.innerWidth;
    let req;
    if (w < 768) {
      req = "small";
    } else if (w >= 768) {
      req = "regular";
    }
    console.log(w, req);
    let url = `https://api.unsplash.com/photos/?client_id=2e071958e3ead1490d476d8df27d16853eebbb6d223efcf25d7b899cec80a836`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(
          { imgUrls: data.slice(0, this.props.no_of_slides), imgSize: req },
          () => {
            let slides = document.getElementsByClassName("imgContainer");
            slides[0].style.opacity = 1;
            let dots = document.getElementsByClassName("dots");
            dots[0].classList.add("active");
            this.setAutoplay();
          }
        );
      });
  }
  state = {
    imgUrls: [],
    imgSize: "",
    currIndex: 0
  };

  setAutoplay = () => {
    let context = this;
    timer = setInterval(() => {
      this.moveImage(context.state.currIndex + 1);
    }, 3000);
  };

  moveImage = index => {
    let { currIndex } = this.state;
    let slides = document.getElementsByClassName("imgContainer");
    let dots = document.getElementsByClassName("dots");
    let current, next;
    let slideClass = {
      current: "",
      next: ""
    };
    console.log(index, currIndex);
    if (index > currIndex) {
      if (index >= slides.length) {
        index = 0;
      }
      slideClass.current = "moveCurrentLeft";
      slideClass.next = "moveNextLeft";
    } else if (index < currIndex) {
      if (index < 0) {
        index = slides.length - 1;
      }
      slideClass.current = "moveCurrentRight";
      slideClass.next = "moveNextRight";
    }
    if (index !== currIndex) {
      current = slides[currIndex];
      next = slides[index];
      for (let i = 0; i < slides.length; i++) {
        slides[i].className = "imgContainer";
        slides[i].style.opacity = 0;
        dots[i].classList.remove("active");
      }
      current.classList.add(slideClass.current);
      next.classList.add(slideClass.next);
      next.style.opacity = 1;
      dots[index].classList.add("active");
      this.setState({ currIndex: index });
    }
  };

  render() {
    let { imgUrls, currIndex, imgSize } = this.state;
    return (
      <div className="container">
        <div className="carousel">
          {imgUrls.map((img, index) => {
            return (
              <Slide
                key={index}
                image={img.urls[imgSize]}
                caption={this.props.titles[index]}
              />
            );
          })}
          <div
            className="leftArrow"
            onClick={() => {
              clearTimeout(timer);
              this.setAutoplay();
              this.moveImage(currIndex - 1);
            }}
          >
            <span className="arrow left_arrow" />
          </div>
          <div
            className="rightArrow"
            onClick={() => {
              clearTimeout(timer);
              this.setAutoplay();
              this.moveImage(currIndex + 1);
            }}
          >
            <span className="arrow right_arrow" />
          </div>
        </div>
        <div className="pagination">
          {imgUrls.map((img, index) => {
            return (
              <span
                key={index}
                className="dots"
                onClick={() => {
                  clearTimeout(timer);
                  this.setAutoplay();
                  this.moveImage(index);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default Carousel;
