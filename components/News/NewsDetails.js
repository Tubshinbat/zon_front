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

const NewsDetails = ({ news, shareUrl }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="news__content_header">
        <h2> {news.name}</h2>
        <div className="news__content_dt">
          <li>
            <i class="fa-solid fa-calendar-days"></i>{" "}
            {news.createAt && <ReactTimeAgo date={news.createAt} locale="mn" />}
          </li>
          <li>
            <i class="fa-solid fa-bolt"></i> {news.views}
          </li>
        </div>
      </div>
      <div className="news__content">
        <div className="news__details">
          <div className="news__details_image">
            {news.pictures && news.pictures.length === 1 && (
              <img src={`${base.cdnUrl}/${news.pictures[0]}`} />
            )}
            {news.pictures && news.pictures.length > 1 && (
              <Swiper
                modules={[Navigation]}
                autoHeight={true}
                navigation={{
                  prevEl: ".newsViewSlider__prev",
                  nextEl: ".newsViewSlider__next",
                }}
                className="newsViewSlider"
              >
                {news.pictures.map((pic, index) => (
                  <SwiperSlide className="newsViewSlide" key={index + "nview"}>
                    <img src={`${base.cdnUrl}/${pic}`} />
                  </SwiperSlide>
                ))}
                <div className="newsViewSlide__nav">
                  <div className="newsViewSlider__prev swiper-button-prev"></div>
                  <div className="newsViewSlider__next swiper-button-next"></div>
                </div>
              </Swiper>
            )}
          </div>
          <div className="news__content_categories">
            {news.categories &&
              news.categories.length > 0 &&
              news.categories.map((cat) => (
                <Link href={`/news?categories=${cat.name}`}> {cat.name} </Link>
              ))}
          </div>
          <div>
            {" "}
            {news.type === "video" &&
              news.videos &&
              news.videos.map((video) => (
                <div className="col-md-12">
                  <video
                    controls
                    src={`${base.cdnUrl}/${video}`}
                    className="video"
                  />
                </div>
              ))}
            {news.type === "audio" &&
              news.audios &&
              news.audios.map((audio) => (
                <div className="col-md-12">
                  <audio controls src={`${base.cdnUrl}/${audio}`}></audio>
                </div>
              ))}
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: news.details,
            }}
          ></div>
          <div className="news__socials">
            <Share shareUrl={shareUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
