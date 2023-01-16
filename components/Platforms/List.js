"use client";
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
import { getPlatforms } from "lib/platforms";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const { htmlToText } = require("html-to-text");

const PlatformList = ({ platforms, pagination: initPagination }) => {
  // Params
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(`${searchParams.toString()}`);
  const [data, setData] = useState(platforms);
  const [pagination, setPagination] = useState(initPagination);
  const [loading] = useState(false);

  const queryBuild = (key, event) => {
    urlParams.set(key, event);
    router.push(`${pathname}?${urlParams}`);
  };

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();
  const [category, setCategory] = useState("Зарлал");

  useEffect(() => {
    const fetchData = async () => {
      const { platforms, pagination } = await getPlatforms(
        searchParams.toString()
      );
      setPagination(pagination);
      setData(platforms);
    };

    const cat = searchParams.get("categories");
    setCategory(cat);

    fetchData();
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
    setQuerys((bq) => ({ ...bq, page: pageNumber }));
  };

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  return (
    <>
      <div className="section_news_title">
        <h4> Платформууд </h4>
        <div className="filters__head">
          <div className="sorter">
            <select
              onChange={(event) => queryBuild("sort", event.target.value)}
            >
              <option value="createAt:descend" selected>
                Шинэ нь эхэндээ
              </option>
              <option value="createAt:ascend"> Хуучин нь эхэндээ </option>
              <option value="views:descend"> Үзэлт ихтэй нь эхэндээ </option>
            </select>
          </div>
        </div>
      </div>
      <div className="row grid__contents">
        {data &&
          data.length > 0 &&
          data.map((el) => (
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="grid__item">
                <div className="grid__item_img">
                  <a
                    href={
                      el.isDirect === true ? el.direct : `/platforms/${el._id}`
                    }
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
                    href={
                      el.isDirect === true ? el.direct : `/platforms/${el._id}`
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

      {data && data.length <= 0 && <NotFound />}
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

export default PlatformList;
