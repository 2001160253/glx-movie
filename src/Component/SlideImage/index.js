import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

export default function Slide(props) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
    loop:true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true
  };
  if (props.listImages.length > 0) {
    return (
      <Slider {...settings}>
        {props.listImages.map((image, i) => {
          return (
            <div className="imgContainer" key={i}>
              <img src={image} alt="123" className='sliderImg' />
            </div>
          );
        })}
      </Slider>
    )
  }
  return null;
}
