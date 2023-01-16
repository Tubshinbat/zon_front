"use client";
import base from "lib/base";
const { htmlToText } = require("html-to-text");
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faClock,
  faFireAlt,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";
import { useState } from "react";

const NewsTop = ({
  newsStar,
  newNews,
  fireNews,
  services,
  newsCat,
  newsCat1,
  newsVideo,
  adsies,
}) => {
  const [selectTab, setSelectTab] = useState("new");

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-8 col-lg-8"
            data-aos="fade-down"
            data-aos-easing="ease-in-sine"
            data-aos-duration="800"
          >
            <div className="section__title">
              <h2>Онцлох мэдээлэл</h2>
              <div className="all__more">
                <Link href="/news"> Бүх мэдээллийг харах</Link>
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
              }}
              loop="true"
              simulateTouch="false"
              className="topNews_slider"
            >
              {newsStar &&
                newsStar.map((el) => (
                  <SwiperSlide key={el._id} className={`topNews_slide_item `}>
                    <div className="topNews_slide_image_box">
                      {el.type !== "default" && (
                        <div className="news__type">
                          {el.type == "audio" && (
                            <i className="fa-solid fa-volume-high"></i>
                          )}
                          {el.type == "video" && (
                            <i className="fa-solid fa-video"></i>
                          )}
                        </div>
                      )}

                      <Link href={`/news/${el._id}`}>
                        {el.pictures && el.pictures[0] ? (
                          <img src={`${base.cdnUrl}/${el.pictures[0]}`} />
                        ) : (
                          <img src="/images/img_notfound.jpg" />
                        )}
                      </Link>
                    </div>
                    <div className="topNews_slide_content">
                      <div className="topNews_slide_categories">
                        {el.categories &&
                          el.categories.map((cat) => (
                            <Link href={`/news?categories=${cat._id}`}>
                              <div className="topNews__category">
                                {cat.name}
                              </div>
                            </Link>
                          ))}
                      </div>
                      <Link href={`/news/${el._id}`}>
                        <h3>{el.name.substr(0, 110)}</h3>
                      </Link>
                      <p>
                        {" "}
                        {htmlToText(el.details, {
                          limits: 10,
                        }).length > 170
                          ? htmlToText(el.details, {
                              limits: 10,
                            }).substr(0, 170) + "..."
                          : htmlToText(el.details, {
                              limits: 10,
                            })}
                      </p>
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
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="section_sub_title">
              <h4>Барилга угсралт</h4>
              <Link href={`/news?categories=Барилга угсралт`}>
                Бүгдийг нь үзэх
              </Link>
            </div>
            <div className="row mb-3">
              {newsCat.map((news, index) => (
                <div
                  className="col-lg-4 col-md-4"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="home__news_item">
                    <Link
                      href={`/news/${news._id}`}
                      className="home__news_item_link"
                    >
                      <div className="home__news_imgbox">
                        {news.type !== "default" && (
                          <div className="news__type">
                            {news.type == "audio" && (
                              <i className="fa-solid fa-volume-high"></i>
                            )}
                            {news.type == "video" && (
                              <i className="fa-solid fa-video"></i>
                            )}
                          </div>
                        )}
                        <img src={`${base.cdnUrl}/450/${news.pictures[0]}`} />
                      </div>
                    </Link>
                    <div className="home__news_content">
                      <Link href={`/news/${news._id}`}>
                        {" "}
                        {news.name.substr(0, 42)}...
                      </Link>
                      <div className="tab__side_dt">
                        <li>
                          <FontAwesomeIcon icon={faBolt} /> {news.views}
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faClock} />
                          <ReactTimeAgo date={news.createAt} locale="mn" />
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="section_sub_title">
              <h4>Үйл явдал</h4>
              <Link href={`/news?categories=Үйл явдал`}> Бүгдийг нь үзэх</Link>
            </div>
            <div className="row mb-3">
              {newsCat1.map((news, index) => (
                <div
                  className="col-lg-4 col-md-4"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="home__news_item">
                    <Link
                      href={`/news/${news._id}`}
                      className="home__news_item_link"
                    >
                      <div className="home__news_imgbox">
                        {news.type !== "default" && (
                          <div className="news__type">
                            {news.type == "audio" && (
                              <i className="fa-solid fa-volume-high"></i>
                            )}
                            {news.type == "video" && (
                              <i className="fa-solid fa-video"></i>
                            )}
                          </div>
                        )}
                        <img src={`${base.cdnUrl}/450/${news.pictures[0]}`} />
                      </div>
                    </Link>
                    <div className="home__news_content">
                      <Link href={`/news/${news._id}`}>
                        {" "}
                        {news.name.substr(0, 42)}...
                      </Link>
                      <div className="tab__side_dt">
                        <li>
                          <FontAwesomeIcon icon={faBolt} /> {news.views}
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faClock} />
                          <ReactTimeAgo date={news.createAt} locale="mn" />
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="section_sub_title">
              <h4>Ярилцлага</h4>
              <Link href={`/news?categories=Ярилцлага`}> Бүгдийг нь үзэх</Link>
            </div>
            <div className="row mb-3">
              {newsVideo.map((news, index) => (
                <div className="col-lg-4 col-md-4">
                  <div
                    className="home__news_item"
                    data-aos="fade-up"
                    data-aos-duration={800}
                  >
                    <Link
                      href={`/news/${news._id}`}
                      className="home__news_item_link"
                    >
                      <div className="home__news_imgbox">
                        {news.type !== "default" && (
                          <div className="news__type">
                            {news.type == "audio" && (
                              <i className="fa-solid fa-volume-high"></i>
                            )}
                            {news.type == "video" && (
                              <i className="fa-solid fa-video"></i>
                            )}
                          </div>
                        )}
                        <img src={`${base.cdnUrl}/450/${news.pictures[0]}`} />
                      </div>
                    </Link>
                    <div className="home__news_content">
                      <Link href={`/news/${news._id}`}>
                        {" "}
                        {news.name.substr(0, 42)}...
                      </Link>
                      <div className="tab__side_dt">
                        <li>
                          <FontAwesomeIcon icon={faBolt} /> {news.views}
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faClock} />
                          <ReactTimeAgo date={news.createAt} locale="mn" />
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-4 "
            data-aos="fade-up"
            data-aos-duration={800}
          >
            <div className="home__sides sticky-top">
              <div className="home__side home__side_tab">
                <div className="tab__side_option">
                  <div
                    className={`tab__option ${selectTab == "new" && "active"}`}
                    onClick={() => setSelectTab("new")}
                  >
                    <FontAwesomeIcon icon={faClock} />
                    Сүүлд орсон
                  </div>
                  <div
                    className={`tab__option ${selectTab == "top" && "active"}`}
                    onClick={() => setSelectTab("top")}
                  >
                    <FontAwesomeIcon icon={faFireAlt} />
                    Топ мэдээ
                  </div>
                </div>
                <div
                  className="tab__side_lists"
                  style={{ display: selectTab == "new" ? "block" : "none" }}
                >
                  {newNews.map((news) => (
                    <div className="tab__side_item">
                      <Link href={`/news/${news._id}`}>
                        {news.pictures && news.pictures[0] ? (
                          <img
                            src={`${base.cdnUrl}/150x150/${news.pictures[0]}`}
                          />
                        ) : (
                          <img src="/images/img_notfound.jpg" />
                        )}
                      </Link>
                      <div className="tab__side_content">
                        {/* {news.categories && news.categories[0] && (
                          <Link
                            href={`/news?categories=${news.categories[0].name}`}
                            className="tab__side_category"
                          >
                            {news.categories[0].name}
                          </Link>
                        )} */}
                        <Link href={`/news/${news._id}`}>
                          <h6>
                            {news.name.length > 55
                              ? news.name.substr(0, 55) + "..."
                              : news.name}
                          </h6>
                        </Link>
                        <div className="tab__side_dt">
                          <li>
                            <FontAwesomeIcon icon={faBolt} /> {news.views}
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faClock} />
                            <ReactTimeAgo date={news.createAt} locale="mn" />
                          </li>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab__side_lists"
                  style={{ display: selectTab == "top" ? "block" : "none" }}
                >
                  {fireNews.map((news) => (
                    <div className="tab__side_item">
                      <Link href={`/news/${news._id}`}>
                        {news.pictures && news.pictures[0] ? (
                          <img
                            src={`${base.cdnUrl}/150x150/${news.pictures[0]}`}
                          />
                        ) : (
                          <img src="/images/img_notfound.jpg" />
                        )}
                      </Link>
                      <div className="tab__side_content">
                        {/* {news.categories && news.categories[0] && (
                          <Link
                            href={`/news?categories=${news.categories[0].name}`}
                            className="tab__side_category"
                          >
                            {news.categories[0].name}
                          </Link>
                        )} */}
                        <Link href={`/news/${news._id}`}>
                          <h6>
                            {news.name.length > 55
                              ? news.name.substr(0, 55) + "..."
                              : news.name}
                          </h6>
                        </Link>
                        <div className="tab__side_dt">
                          <li>
                            <FontAwesomeIcon icon={faBolt} /> {news.views}
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faClock} />
                            <ReactTimeAgo date={news.createAt} locale="mn" />
                          </li>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="home__side">
                <div className="home__services">
                  <div className="row">
                    {services.map((service) => (
                      <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <a
                          href={`${
                            service.direct === true
                              ? service.link
                              : "/services/" + service._id
                          }`}
                          className="home__service_item"
                        >
                          <h4> {service.name} </h4>
                          <div className="home__service_imgbox">
                            {service.pictures && service.pictures[0] && (
                              <img
                                src={`${base.cdnUrl}/450/${service.pictures[0]}`}
                              />
                            )}
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="home__side ">
                <div className="home__side_title">
                  <h4>Зарлал</h4>
                  <Link href="/announce">Бүгдийг харах</Link>
                </div>
                <div className="home__side_ads_list">
                  {adsies &&
                    adsies.length > 0 &&
                    adsies.map((ads) => (
                      <div className="home__side_ads_item row">
                        <div className="col-xl-4 col-md-4">
                          <Link href={`/announce/${ads._id}`}>
                            <div className="ads__item_image">
                              {ads.pictures && ads.pictures[0] ? (
                                <img
                                  src={`${base.cdnUrl}/450/${ads.pictures[0]}`}
                                />
                              ) : (
                                <img src="/images/img_notfound.jpg" />
                              )}
                            </div>
                          </Link>
                        </div>
                        <div className="col-xl-8 col-md-8">
                          <div className="ads__side_dtl">
                            <Link
                              href={`/announce/${ads._id}`}
                              className="ads__title"
                            >
                              {ads.name}
                            </Link>
                            <div className="tab__side_dt">
                              <li>
                                <FontAwesomeIcon icon={faBolt} /> {ads.views}
                              </li>
                              <li>
                                <FontAwesomeIcon icon={faClock} />
                                <ReactTimeAgo date={ads.createAt} locale="mn" />
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsTop;
