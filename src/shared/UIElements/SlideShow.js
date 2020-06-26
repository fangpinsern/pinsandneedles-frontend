import React, { useState } from "react";

import "./SlideShow.css";
import SlideShowImage from "./SlideShowImage";

// props
// imgCollection

// let slideIndex = 0;
function SlideShow(props) {
  const imgCollection = props.imgCollection;
  //   const [slideIndex, setSlideIndex] = useState(1);
  //   const [currentStyle, setCurrentStyle] = useState({});

  //   showSlides(slideIndex);

  //   // Next/previous controls
  //   function plusSlides(n) {
  //     const a = slideIndex + n;
  //     // setSlideIndex(a);
  //     // showSlides(slideIndex);
  //   }

  //   // Thumbnail image controls
  //   //   function currentSlide(n) {
  //   //     showSlides((slideIndex = n));
  //   //   }

  //   function showSlides(n) {
  //     let i;
  // const slides = document.getElementById(slideIndex.toString());
  // slides.style.display = "block";
  // console.log(slides.length);
  // let dots = document.getElementsByClassName("dot");
  // if (n > slides.length) {
  //   setSlideIndex(1);
  // }
  // if (n < 1) {
  //   setSlideIndex(slides.length);
  // }
  // for (i = 0; i < slides.length; i++) {
  //   slides[i].style.display = "none";
  // }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  // slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
  //   }
  //   let slideIndex = 0;
  const [slideIndex, setSlideIndex] = useState(0);
  const [image, setImage] = useState(imgCollection[slideIndex]);

  console.log(slideIndex);
  function plusSlides(n) {
    let a = slideIndex + n;

    if (a >= imgCollection.length) {
      a = 0;
      setSlideIndex(0);
    } else if (a < 0) {
      a = imgCollection.length - 1;
      setSlideIndex(imgCollection.length - 1);
    } else {
      setSlideIndex(a);
    }
    setImage(imgCollection[a]);
  }

  return (
    <div className="slideshow-container">
      <SlideShowImage
        id={image}
        src={process.env.REACT_APP_BACKEND_URL + "/" + image}
      />
      {/* <div className="mySlides fade">
        <div className="numbertext">2 / 3</div>
        <img src="img2.jpg" style="width:100%" />
        <div className="text">Caption Two</div>
      </div>
      <div className="mySlides fade">
        <div className="numbertext">3 / 3</div>
        <img src="img3.jpg" style="width:100%" />
        <div className="text">Caption Three</div>
      </div> */}
      <a className="prev" onClick={() => plusSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>
    </div>
  );
}

export default SlideShow;
