import React from "react";
import SwiperCore, { EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "./Slider.scss";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([EffectCoverflow, Pagination]);

export default function Slider() {
  const listItems = [
    "https://cdn.galaxycine.vn/media/2023/1/14/nha-ba-nu-4_1673710602771.jpg",
    "https://cdn.galaxycine.vn/media/2023/1/27/2_1674789951968.jpg",
    "https://cdn.galaxycine.vn/media/2023/1/28/22_1674873104078.jpg",
    "https://cdn.galaxycine.vn/media/2022/11/1/combo-u22-digital-2048x682_1667285637091.jpg",
    "https://cdn.galaxycine.vn/media/2023/1/17/bangqltv-2023-digital-2048x682_1673944592941.jpg",
  ];

  return (
    <div className="swiperContainer">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {listItems.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img className="imgSlider" src={img} alt="pic" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
