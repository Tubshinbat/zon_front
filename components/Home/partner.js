"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import base from "lib/base";
import Link from "next/link";
import { useEffect, useState } from "react";

const Partner = ({ partners: partnerData }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    if (partnerData && partnerData.length > 0) {
      setPartners(partnerData);
    }
  }, [partnerData]);

  return (
    <section className="section partner_section">
      <div className="container">
        <div className="section__title">
          <h2>Хамтрагч компаниуд</h2>
          <div className="all__more">
            <Link href="/partners"> Бүгдийг нь харах</Link>
          </div>
        </div>
      </div>
      <div className="container">
        {partners && (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 5000,
            }}
            loop="true"
            simulateTouch="false"
            slidesPerView={6}
            spaceBetween={40}
            className="partners_slider"
            breakpoints={{
              1400: {
                slidesPerView: 5,
              },
              1000: {
                slidesPerView: 4,
              },

              800: {
                slidesPerView: 3,
              },

              700: {
                slidesPerView: 3,
              },

              500: {
                slidesPerView: 2,
              },

              300: {
                slidesPerView: 1,
              },

              100: {
                slidesPerView: 1,
              },
            }}
          >
            {partners &&
              partners.length > 0 &&
              partners.map((el, index) => (
                <SwiperSlide
                  key={index}
                  className={`partners_slider_item `}
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <Link href={`/partners/${el._id}`}>
                    <div className="partners_slider_img">
                      <img src={`${base.cdnUrl}/450/${el.logo}`} />
                    </div>
                    {el.name}
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Partner;
