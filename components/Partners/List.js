"use client";
import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import Loading from "app/loading";
import NotFound from "components/NotFound";
import { getAdsies } from "lib/ads";
import { getPlatforms } from "lib/platforms";
import { getServices } from "lib/services";
import { getPartners } from "lib/partners";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const { htmlToText } = require("html-to-text");

const PartnerList = ({ partners, pagination: initPagination }) => {
  const [data, setData] = useState(partners);
  const [pagination, setPagination] = useState(initPagination);
  const [loading, setLoading] = useState(false);
  const [querys, setQuerys] = useState(``);

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryBuild = () => {
    let obj = querys;
    let qr = "";
    const keys = Object.keys(obj);
    keys.map((key) => {
      if (obj[key]) {
        qr += `&${key}=${obj[key]}`;
      }
    });
    return qr;
  };

  useEffect(() => {
    if (searchParams) {
      const page = searchParams.get("page");
      const params = { page };
      setQuerys(params);
    }
  }, [searchParams]);

  useEffect(() => {
    if (querys) {
      const qry = queryBuild();
      router.replace(`/partners?${qry}`);
      const fetchData = async () => {
        const { partners, pagination } = await getPartners(`status=true${qry}`);
        setPagination(pagination);
        setData(partners);
      };

      fetchData();
    }
  }, [querys]);

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
        <h4> Хамтрагч байгууллагууд </h4>
        <div className="filters__head"></div>
      </div>
      <div className="row grid__contents">
        {data &&
          data.length > 0 &&
          data.map((el) => (
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
              <div
                className="grid__item grid__partner"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                <div className="grid__item_img">
                  <a
                    href={
                      el.isDirect === true ? el.direct : `/partners/${el._id}`
                    }
                  >
                    {el.logo ? (
                      <img src={`${base.cdnUrl}/${el.logo}`} />
                    ) : (
                      <img src={`/images/img_notfound.jpg`} />
                    )}
                  </a>
                </div>
                <div className="gird__content">
                  <a
                    href={
                      el.isDirect === true ? el.direct : `/partners/${el._id}`
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

export default PartnerList;
