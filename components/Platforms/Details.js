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
import { getPages } from "lib/page";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);
const PlatformDetails = ({ platform, shareUrl, pid }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { pages, pagination: initPagination } = await getPages(
        `modal=${pid}`
      );
      setData(pages);
      setPagination(initPagination);
      setLoading(false);
    };
    fetchData();
  }, []);

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();

  // useEffect(() => {
  //   if (searchParams) {
  //     const page = searchParams.get("page");
  //     const fetchData = async () => {
  //       const { pages, pagination: initPagination } = await getPages(
  //         `status=true&modal=${pid}`
  //       );
  //       setPagination(initPagination);
  //       setData(pages);
  //     };
  //   }
  // }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
    router.replace(`/platforms/${pid}?parent=${pid}&status=true&page=${page}`);
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
        <h2> {platform.name}</h2>
        <div className="page__content_dt">
          <li>
            <i class="fa-solid fa-calendar-days"></i>{" "}
            {platform.createAt && (
              <ReactTimeAgo date={platform.createAt} locale="mn" />
            )}
          </li>
          <li>
            <i class="fa-solid fa-bolt"></i> {platform.views}
          </li>
        </div>
      </div>
      <div className="page__content">
        <div className="page__details">
          <div className="page__details_image">
            {platform.picture && (
              <img src={`${base.cdnUrl}/${platform.picture}`} />
            )}
          </div>

          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: platform.details,
            }}
          ></div>
          <div className="page__socials">
            <Share shareUrl={shareUrl} />
          </div>
        </div>
      </div>
      <div className="row grid__contents">
        {loading == true && "Түр хүлээнэ үү"}
        {data &&
          data.length > 0 &&
          data.map((el) => (
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="grid__item">
                <div className="grid__item_img">
                  <Link href={`/page_data/${el._id}`}>
                    {el.pictures && el.pictures.length > 0 ? (
                      <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                    ) : (
                      <img src={`/images/img_notfound.jpg`} />
                    )}
                  </Link>
                </div>
                <div className="gird__content">
                  <Link href={`/page_data/${el._id}`}>
                    {el.name.length > 90
                      ? el.name.substr(0, 90) + "..."
                      : el.name}
                  </Link>
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

export default PlatformDetails;
