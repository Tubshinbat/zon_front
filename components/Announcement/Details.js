"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Navigation } from "swiper";

import base from "lib/base";
import Share from "../Share";

import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import { useEffect } from "react";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const AdsDetails = ({ ads, shareUrl }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page__content_header">
        <h2> {ads.name}</h2>
        <div className="page__content_dt">
          <li>
            <i class="fa-solid fa-calendar-days"></i>{" "}
            {ads.createAt && <ReactTimeAgo date={ads.createAt} locale="mn" />}
          </li>
          <li>
            <i class="fa-solid fa-bolt"></i> {ads.views}
          </li>
        </div>
      </div>
      <div className="page__content">
        <div className="page__details">
          <div className="page__details_image">
            {ads.pictures && ads.pictures.length === 1 && (
              <img src={`${base.cdnUrl}/${ads.pictures[0]}`} />
            )}
            {ads.pictures && ads.pictures.length > 1 && (
              <Swiper
                modules={[Navigation]}
                autoHeight={true}
                navigation={{
                  prevEl: ".adsViewSlider__prev",
                  nextEl: ".adsViewSlider__next",
                }}
                className="adsViewSlider"
              >
                {ads.pictures.map((pic, index) => (
                  <SwiperSlide className="adsViewSlide" key={index + "nview"}>
                    <img src={`${base.cdnUrl}/${pic}`} />
                  </SwiperSlide>
                ))}
                <div className="adsViewSlide__nav">
                  <div className="adsViewSlider__prev swiper-button-prev"></div>
                  <div className="adsViewSlider__next swiper-button-next"></div>
                </div>
              </Swiper>
            )}
          </div>

          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: ads.details,
            }}
          ></div>
          <div className="page__socials page__socials_announce">
            <Share shareUrl={shareUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdsDetails;
