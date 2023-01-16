"use client";
import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import htmlToFormattedText from "html-to-formatted-text";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import { getNews } from "lib/news";
import Loading from "app/loading";
import NotFound from "components/NotFound";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const { htmlToText } = require("html-to-text");

const NewsList = ({ news, pagination: initPagination, params }) => {
  // Params
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(`${searchParams.toString()}`);
  const [category, setCategory] = useState("Мэдээ мэдээлэл");
  const [data, setData] = useState(news);
  const [pagination, setPagination] = useState(initPagination);
  const [loading] = useState(false);
  const [listType, setListType] = useState("column");

  const queryBuild = (key, event) => {
    urlParams.set(key, event);
    router.push(`${pathname}?${urlParams}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { news, pagination } = await getNews(searchParams.toString());
      setPagination(pagination);
      setData(news);
    };

    const cat = searchParams.get("categories");
    setCategory(cat);

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
      {loading === true && <Loading />}

      <div className="section_news_title">
        <h4>{category || "Мэдээ мэдээлэл"} </h4>
        <div className="filters__head">
          <div className="sorter">
            <select
              onChange={(event) => queryBuild("sort", event.target.value)}
            >
              <option value="createAt_descend" selected>
                Шинэ нь эхэндээ
              </option>
              <option value="createAt_ascend"> Хуучин нь эхэндээ </option>
              <option value="views_descend"> Үзэлт ихтэй нь эхэндээ </option>
            </select>
          </div>
          <div className="list__type">
            {listType === "column" && (
              <i
                className="fa-solid fa-grip"
                onClick={() => setListType("grid")}
              ></i>
            )}
            {listType === "grid" && (
              <i
                className="fa-solid fa-grip-lines"
                onClick={() => setListType("column")}
              ></i>
            )}
          </div>
        </div>
      </div>
      {data && data.length <= 0 && <NotFound />}
      <div
        className="row news_grid"
        style={{ display: listType === "grid" ? "flex" : "none" }}
      >
        {data && data.length > 0 ? (
          data.map((el) => (
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
                  <Link href={`/news/${el._id}`} scroll={false}>
                    {el.pictures && el.pictures[0] ? (
                      <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                    ) : (
                      <img src={`/images/img_notfound.jpg`} />
                    )}
                  </Link>
                </div>
                <div className="news_grid_content">
                  <Link href={`/news/${el._id}`} scroll={false}>
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
                    {htmlToFormattedText(el.details).length > 170
                      ? htmlToFormattedText(el.details).substr(0, 170) + "..."
                      : htmlToFormattedText(el.details)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </div>
      <div
        className="row news_col"
        style={{ display: listType === "column" ? "flex" : "none" }}
      >
        {data && data.length > 0 ? (
          data.map((el) => (
            <div className="col-md-12">
              <div className="news__column_item">
                <div className="row">
                  <div className="col-md-4">
                    <div className="news__column_image">
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
                      <Link href={`/news/${el._id}`} scroll={false}>
                        {el.pictures && el.pictures[0] ? (
                          <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                        ) : (
                          <img src={`/images/img_notfound.jpg`} />
                        )}
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="news__column_content">
                      <Link href={`/news/${el._id}`} scroll={false}>
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
                        {htmlToFormattedText(el.details).length > 170
                          ? htmlToFormattedText(el.details).substr(0, 170) +
                            "..."
                          : htmlToFormattedText(el.details)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </div>
      {total && data && data.length > 0 && (
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
    </>
  );
};

export default NewsList;
