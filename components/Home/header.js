"use client";
const { htmlToText } = require("html-to-text");
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
  Lazy,
  Virtual,
} from "swiper";
import Image from "next/image";

import base from "lib/base";

import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/virtual";
import css from "styles/banner.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faClock,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);
import { use, useEffect, useState, useRef } from "react";
import MobileMenu from "./mobileMenu";

function justNumbers(string) {
  let numsStr = string.replace(/[^0-9]/g, "");
  return parseInt(numsStr);
}

const renderMenu = (categories, child = false, parentSlug = "") => {
  let myCategories = [];
  categories &&
    categories.map((el) => {
      myCategories.push(
        <li key={el._id} className={el.children.length > 0 && "dropMenu"}>
          {el.isDirect === true && <a href={el.direct}>{el.name}</a>}
          {el.isModel === true && <Link href={`/${el.model}`}>{el.name}</Link>}
          {el.isDirect === false && el.isModel === false && (
            <Link href={`/page/${el.slug}`}> {el.name}</Link>
          )}
          {el.children.length > 0 && !child ? (
            <ul className={`dropdownMenu`}>
              {renderMenu(el.children, true, el.slug)}
            </ul>
          ) : null}
        </li>
      );
    });

  return myCategories;
};

const HomeHeader = ({ banners, webInfo, menus, news, socialLinks }) => {
  const [newsData, setNewsData] = useState([]);
  const videoEl = useRef();
  useEffect(() => {
    news.length > 0 && setNewsData(news);
  }, [news]);

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".mainHeader");
      if (header) {
        let sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
          header.classList.add(`headerSticky`);
        } else {
          header.classList.remove(`headerSticky`);
        }
      }
    };
    AOS.init();
    if (videoEl && videoEl.current) videoEl.current.play();
  }, []);

  return (
    <>
      <div className={`headerArea`}>
        <Swiper
          modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
          effect="fade"
          autoplay={{
            delay: 7000,
          }}
          className={css.HomeSlide}
        >
          {banners &&
            banners.map((banner) => {
              return (
                <SwiperSlide>
                  <div
                    key={banner._id}
                    className={css.HomeSlideItem}
                    style={{
                      backgroundImage: `url("${base.cdnUrl}/${banner.picture}")`,
                    }}
                  >
                    {banner.type == "video" && banner.video && (
                      <video
                        ref={videoEl}
                        className="background__video"
                        autoplay
                        loop
                        muted
                        src={`${base.cdnUrl}/${banner.video}`}
                      ></video>
                    )}
                    <div className={css.HomeBannerBg}></div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className={`mainHeader`}>
          <div className="container">
            <div className="header" data-aos="fade-in">
              <div className={`logo`} data-aos="fade-in">
                <Link href="/">
                  <img
                    src={`${base.cdnUrl}/${webInfo.whiteLogo}`}
                    className="headerWhiteLogo"
                  />
                  <img
                    src={`${base.cdnUrl}/${webInfo.logo}`}
                    className="headerLogo"
                  />
                </Link>
              </div>
              <nav>
                <ul className={`headerMenu`}>{renderMenu(menus)}</ul>
              </nav>
              <div className={`headerContact`}>
                <a
                  href={`tel:${
                    webInfo.phone && justNumbers(webInfo.phone + "")
                  }`}
                >
                  <FontAwesomeIcon icon={faPhoneVolume} /> {webInfo.phone}{" "}
                </a>
              </div>
              <MobileMenu
                info={webInfo}
                socialLinks={socialLinks}
                menus={menus}
              />
            </div>
          </div>
        </div>
        <div className="container-right ">
          <Swiper
            modules={[Pagination, Navigation, Autoplay, Virtual]}
            // autoplay={{
            //   delay: 3000,
            // }}
            loop="true"
            simulateTouch="false"
            slidesPerView={1.3}
            spaceBetween={40}
            className="top_news_slider"
            pagination={{
              el: ".slider_pagination",
              clickable: true,
            }}
            breakpoints={{
              1000: {
                slidesPerView: 1.3,
              },
              800: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 1,
              },

              100: {
                slidesPerView: 1,
              },
            }}
          >
            {newsData.map((el, index) => (
              <SwiperSlide
                key={index}
                className={`news_slide_item `}
                virtualIndex={index}
              >
                <div className={`newsSlideText ${css.NewsBox}`}>
                  <h1> {el.name.substr(0, 65)}</h1>
                  <p>
                    {htmlToText(el.details, {
                      limits: 10,
                    }).substr(0, 200)}
                    ...
                  </p>
                  <Link href={`/news/${el._id}`}>
                    <button className={css.BannerButton}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </Link>
                </div>

                <Link href={`/news/${el._id}`} className="news_slide_img">
                  <div className="news_slide_content">
                    <h4>
                      {el.name.length > 90
                        ? el.name.substr(0, 90) + "..."
                        : el.name}
                    </h4>
                    <div className="news_slide_dt">
                      <li>
                        <FontAwesomeIcon icon={faBolt} /> {el.views}
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faClock} />
                        <ReactTimeAgo date={el.createAt} locale="mn" />
                      </li>
                    </div>
                  </div>
                  <div className="news_slide_bg"> </div>
                  {el.pictures && el.pictures[0] ? (
                    <img src={`${base.cdnUrl}/${el.pictures[0]}`} />
                  ) : (
                    <img src="/images/img_notfound.jpg" />
                  )}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="container">
          <div className="slider__controls">
            <button type="button" class="scroll_down" id="scroll_down">
              {" "}
            </button>
            <div className="slider_pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
