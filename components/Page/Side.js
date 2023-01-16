"use client";
import { faBolt, faClock, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Link from "next/link";
import { useState } from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

export default ({ ads, newNews, fireNews, menus }) => {
  const [selectTab, setSelectTab] = useState("new");
  return (
    <>
      <div className="sides ">
        {ads && ads.length > 0 && (
          <div className="side__item ads">
            <a href={ads[0].link} target="_blank">
              <img
                src={`${base.cdnUrl}/${ads[0].picture}`}
                className="side__banner"
              />
            </a>
          </div>
        )}
        {menus && menus.length > 0 && (
          <div className="side__item">
            <h4 className="side__item_title">Цэс </h4>
            <div className="side__main">
              <div className="categories__list">
                {menus.map((el) => (
                  <>
                    {el.isDirect == true ? (
                      <a href={el.direct}> {el.name} </a>
                    ) : el.isModel == true ? (
                      <Link href={el.model}> {el.name}</Link>
                    ) : (
                      <Link href={`/page/${el.slug}`}>{el.name} </Link>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="side__item home__side_tab">
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
                    <img src={`${base.cdnUrl}/150x150/${news.pictures[0]}`} />
                  ) : (
                    <img src="/images/img_notfound.jpg" />
                  )}
                </Link>
                <div className="tab__side_content">
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
                    <img src={`${base.cdnUrl}/150x150/${news.pictures[0]}`} />
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

        <div className="side__item">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbarilga.gov&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=177358106423628"
            width={"auto"}
            height={130}
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder={0}
            allowFullScreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </div>
    </>
  );
};
