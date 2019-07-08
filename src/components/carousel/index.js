import React, { Component } from "react";
import "./cssfile.css";
import Slide from "../slides";

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
    // let url = `https://api.unsplash.com/photos/?client_id=2e071958e3ead1490d476d8df27d16853eebbb6d223efcf25d7b899cec80a836`;
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState(
    //       { imgUrls: data.slice(0, this.props.no_of_slides), imgSize: req },
    //       () => {
    //         this.setAutoplay();
    //       }
    //     );
    //   });
    let data = [
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/aurora.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/canyon.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
      "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg"
    ];
    this.setState(
      { imgUrls: data.slice(0, this.props.no_of_slides), imgSize: req },
      () => {
        this.setAutoplay();
      }
    );
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
    let { currIndex, imgUrls } = this.state;
    let slideClass = {
      current: "",
      next: ""
    };
    if (index > currIndex) {
      if (index >= imgUrls.length) {
        index = 0;
      }
      slideClass.current = "moveCurrentLeft";
      slideClass.next = "moveNextLeft";
    } else if (index < currIndex) {
      if (index < 0) {
        index = imgUrls.length - 1;
      }
      slideClass.current = "moveCurrentRight";
      slideClass.next = "moveNextRight";
    }
    if (index !== currIndex) {
      this.setState({
        currIndex: index,
        currSlide: currIndex,
        nextSlide: index,
        slideClass: slideClass
      });
    }
  };

  render() {
    let { imgUrls, currIndex } = this.state;
    return (
      <div className="container">
        <div className="carousel">
          {imgUrls.map((img, index) => {
            return (
              <Slide
                key={index}
                index={index}
                image={img}
                caption={this.props.titles[index]}
                {...this.state}
                setAutoplay={this.setAutoplay}
                moveImage={this.moveImage}
                timer={timer}
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
                className={`dots ${currIndex === index ? "active" : ""}`}
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
