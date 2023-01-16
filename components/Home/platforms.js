"use client";
import { Swiper, SwiperSlide } from "swiper/react";
const { htmlToText } = require("html-to-text");
import TimeAgo from "javascript-time-ago";
import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";
import Image from "next/image";

import base from "lib/base";
import css from "styles/banner.module.css";
import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Link from "next/link";
import { useEffect, useState } from "react";

const Platforms = ({ platforms: initPlatforms }) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    initPlatforms.length > 0 && setPlatforms(initPlatforms);
  }, [initPlatforms]);

  return (
    <section
      className="section"
      data-aos="fade-up"
      data-aos-easing="ease-in-sine"
    >
      <div className="container">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
          }}
          loop="true"
          simulateTouch="false"
          slidesPerView={3}
          spaceBetween={40}
          className="platforms_slide"
          breakpoints={{
            1000: {
              slidesPerView: 3,
            },
            800: {
              slidesPerView: 2,
            },

            100: {
              slidesPerView: 1,
            },
          }}
        >
          {platforms &&
            platforms.map((el) => (
              <SwiperSlide key={el._id} className="platform_slide">
                <div className="platform_slide_image">
                  <a
                    href={
                      el.isDirect === true ? el.direct : `/platforms/${el._id}`
                    }
                  >
                    {el.picture ? (
                      <img src={`${base.cdnUrl}/${el.picture}`} />
                    ) : (
                      <img src="/images/img_notfound.jpg" />
                    )}
                  </a>
                  {el.icon && (
                    <div className="platform_slide_icon">
                      <img src={`${base.cdnUrl}/${el.icon}`} />
                    </div>
                  )}
                </div>
                <div className="platform_slide_content">
                  <a
                    href={
                      el.isDirect === true ? el.direct : `/platforms/${el._id}`
                    }
                  >
                    <h3> {el.name} </h3>
                  </a>
                  <p>
                    {htmlToText(el.details, {
                      limits: 10,
                    }).substr(0, 200)}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Platforms;
