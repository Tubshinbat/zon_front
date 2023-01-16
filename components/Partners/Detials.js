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
import { getIdPage, getPage, getPages } from "lib/page";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const PartnerDetails = ({ partner, shareUrl, partnerid }) => {
  const [data, setData] = useState([]);
  const [description, setDescription] = useState(partner.companyInfo);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      const scat = searchParams.get("scat");
      const fetchData = async () => {
        const { page } = await getIdPage(scat);
        if (page.pageInfo) setDescription(page.pageInfo);
      };

      if (scat) {
        fetchData();
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const { pages, pagination: initPagination } = await getPages(
        `status=true&modal=${partnerid}`
      );
      setData(pages);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="partner__show_box">
        <div className="partner_cover">
          {partner.cover ? (
            <img src={`${base.cdnUrl}/${partner.cover}`} />
          ) : (
            <img src="/images/notfound_cover.jpg" />
          )}
          <ul className="partner__links">
            <a href={`http://${partner.link}`} target="_blank">
              <i className="fa-solid fa-earth-americas"></i> Вэб сайт{" "}
            </a>
          </ul>
        </div>
        <div className="partner__header__info">
          <div className="partner__infos">
            <div className="partner_profile">
              <img src={`${base.cdnUrl}/${partner.logo}`} />
            </div>
            <div className="partner__dtl">
              <h3> {partner.name} </h3>
            </div>
          </div>
          <div className="back_profile" onClick={() => router.back()}>
            {" "}
            Буцах{" "}
          </div>
        </div>
      </div>
      <nav className="partner__header">
        <li>
          <a href={`/partners/${partnerid}`}> Танилцуулга </a>
        </li>
        {data.map((page) => (
          <li key={page._id}>
            <Link href={`/partners/${partnerid}?scat=${page._id}`}>
              {page.name}{" "}
            </Link>
          </li>
        ))}
      </nav>

      <div className="partner__content">
        <div className="partner__details">
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PartnerDetails;
