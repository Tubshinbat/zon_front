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
import { getNews, getSlugCategory } from "lib/news";
import Loading from "app/loading";
import NotFound from "components/NotFound";
import { getFaqs } from "lib/faq";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const { htmlToText } = require("html-to-text");
const Faq = ({ faqs, pagination: initPagination }) => {
  const [data, setData] = useState(faqs);
  const [pagination, setPagination] = useState(initPagination);
  const [loading, setLoading] = useState(false);
  const [querys, setQuerys] = useState(``);

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();
  const [notFound, setNotFound] = useState();
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
      const sort = searchParams.get("sort");
      const page = searchParams.get("page");
      const name = searchParams.get("name");
      const params = { sort, page, name };
      setQuerys(params);
    }
  }, [searchParams]);

  useEffect(() => {
    if (querys) {
      const qry = queryBuild();
      router.replace(`/faq?${qry}`);
      const fetchData = async () => {
        const { faqs, pagination } = await getFaqs(`status=true${qry}`);
        setPagination(pagination);
        setData(faqs);
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
      <div className="faq__box">
        <h4> Түгээмэл асуулт хариулт </h4>
        <form method="GET">
          <div className="faq__search_box">
            <button type="submit">
              <i className="fa fa-search " />
            </button>
            <input type="text" name="name" placeholder="Энд бичиж хайна уу" />
          </div>
        </form>
      </div>
      <section className="section">
        <div className="faq_list_box">
          <div className="container">
            <div className="row">
              {data && data.length > 0 ? (
                data.map((faq) => (
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="faq__item">
                      <h2> " </h2>
                      <Link href={`/faq/${faq._id}`}> {faq.name} </Link>
                      <p>
                        {faq.question.length > 190
                          ? faq.question.substr(0, 190) + "..."
                          : faq.question}
                      </p>
                      <div className="faq__box_footer">
                        <Link href={`/faq/${faq._id}`}> Дэлгэрэнгүй </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NotFound />
              )}

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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
