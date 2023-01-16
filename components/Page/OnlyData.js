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
import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import { getNews } from "lib/news";
import Loading from "app/loading";
import NotFound from "components/NotFound";
import { getPages } from "lib/page";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const { htmlToText } = require("html-to-text");

const OnlyData = ({ data, pageid }) => {
  const page = data.page;
  const news = data.news;
  const menu = data.menu;
  const pages = data.pages;
  const menus = data.menus;

  //Params
  const router = useRouter();
  const pathname = usePathname();
  const [datas, setDatas] = useState(pages);
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(`${searchParams.toString()}`);

  const [pagination, setPagination] = useState({});
  const [loading] = useState(false);
  const [listType, setListType] = useState("column");

  const queryBuild = (key, event) => {
    urlParams.set(key, event);
    router.push(`${pathname}?${urlParams}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { pages, pagination } = await getPages(
        `${searchParams.toString()}&parent=${pageid}`
      );
      setPagination(pagination);
      setDatas(pages);
    };

    fetchData();
  }, [searchParams]);

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  const handlePageChange = (pageNumber) => {
    queryBuild("page", pageNumber);
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
  };

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  return (
    <>
      <div className="page__content_header">
        <h2>{page && page.name}</h2>
        <div className="page__content_dt">
          <li>
            {page && page.createAt && (
              <>
                <i class="fa-solid fa-calendar-days"></i>
                <ReactTimeAgo date={page.createAt} locale="mn" />
              </>
            )}
          </li>
        </div>
      </div>
      {page && (
        <div className="page__details" style={{ width: "100%" }}>
          <div className="page__details_image">
            {page.pictures && page.pictures.length === 1 && (
              <img src={`${base.cdnUrl}/${page.pictures[0]}`} />
            )}
            {page.pictures && page.pictures.length > 1 && (
              <Swiper
                modules={[Navigation]}
                autoHeight={true}
                navigation={{
                  prevEl: ".newsViewSlider__prev",
                  nextEl: ".newsViewSlider__next",
                }}
                className="newsViewSlider"
              >
                {page.pictures.map((pic, index) => (
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

          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: page.pageInfo,
            }}
          ></div>
        </div>
      )}
      <div className="row grid__contents">
        {datas &&
          datas.length > 0 &&
          datas.map((el) => (
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="grid__item">
                <div className="grid__item_img">
                  <a
                    href={
                      el.isDirect === true ? el.direct : `/page_data/${el._id}`
                    }
                  >
                    {el.pictures && el.pictures.length > 0 ? (
                      <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                    ) : (
                      <img src={`/images/img_notfound.jpg`} />
                    )}
                  </a>
                </div>
                <div className="gird__content">
                  <a
                    href={
                      el.isDirect === true ? el.direct : `/page_data/${el._id}`
                    }
                  >
                    {el.name.length > 90
                      ? el.name.substr(0, 90) + "..."
                      : el.name}
                  </a>
                  <div className="news_grid_dt">
                    <li>
                      <FontAwesomeIcon icon={faBolt} /> {el.views}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                      <ReactTimeAgo date={el.createAt} locale="mn" />
                    </li>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {total && datas && datas.length > 0 && (
        <div className={`pagination__list`}>
          <Pagination
            activePage={parseInt(searchParams.get("page")) || 1}
            itemClass={`page-item`}
            linkClass={"page-link"}
            itemsCountPerPage={limit}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={handlePageChange.bind()}
          />
        </div>
      )}

      {page && page.listActive === true && menus && menus.length > 0 && (
        <div className="row grid__contents">
          <div class="section_sub_title">
            <h4>Холбоотой цэснүүд</h4>
          </div>
          {menus.map((el) => (
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="grid__item">
                <div className="grid__item_img">
                  <a
                    href={` ${
                      el.isDirect === true
                        ? el.direct
                        : el.isModel === true
                        ? el.model
                        : "/page/" + el.slug
                    }  `}
                  >
                    {el.picture ? (
                      <img src={`${base.cdnUrl}/450/${el.picture}`} />
                    ) : (
                      <img src={`/images/img_notfound.jpg`} />
                    )}
                  </a>
                </div>
                <div className="gird__content">
                  <a
                    href={` ${
                      el.isDirect === true
                        ? el.direct
                        : el.isModel === true
                        ? el.model
                        : "/page/" + el.slug
                    }  `}
                  >
                    {el.name.length > 90
                      ? el.name.substr(0, 90) + "..."
                      : el.name}
                  </a>
                  <div className="news_grid_dt">
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                      <ReactTimeAgo date={el.createAt} locale="mn" />
                    </li>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {page && page.newsActive === true && (
        <div className="row news_grid">
          <div class="section_sub_title">
            <h4>Холбоотой нийтлэлүүд</h4>
          </div>
          {news && news.length > 0 ? (
            news.map((el) => (
              <div className="col-md-6">
                <div className="news__grid_item">
                  <div className="news__gird_image">
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
                        <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                      ) : (
                        <img src={`/images/img_notfound.jpg`} />
                      )}
                    </Link>
                  </div>
                  <div className="news_grid_content">
                    <Link href={`/news/${el._id}`}>
                      <h4>
                        {el.name.length > 90
                          ? el.name.substr(0, 90) + "..."
                          : el.name}
                      </h4>
                    </Link>
                    <div className="news_grid_dt">
                      <li>
                        <FontAwesomeIcon icon={faBolt} /> {el.views}
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faClock} />
                        <ReactTimeAgo date={el.createAt} locale="mn" />
                      </li>
                    </div>
                    <p>
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NotFound />
          )}
        </div>
      )}
    </>
  );
};

export default OnlyData;
