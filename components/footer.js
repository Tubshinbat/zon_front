"use client";
import base from "lib/base";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default ({ info, menus, socialLinks }) => {
  const renderMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id}>
            {el.isDirect === true && <a href={el.direct}>{el.name}</a>}
            {el.isModel === true && (
              <Link href={`/${el.model}`} scroll={false}>
                {el.name}
              </Link>
            )}

            {el.isDirect === false && el.isModel === false && (
              <Link href={`/page/${el.slug}`} scroll={false}>
                {el.name}
              </Link>
            )}
          </li>
        );
      });

    return myCategories;
  };
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer__box">
            <div className="row">
              <div className="col-lg-6">
                <div className="footer__about">
                  <img src={`${base.cdnUrl}/${info.whiteLogo}`} />
                  <p> {info.siteInfo} </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footerTitle">Бидний тухай</div>
                {renderMenu(menus)}
              </div>
              <div className="col-lg-3">
                <div className="footerTitle">Холбоо барих</div>
                <div className="footerContacts">
                  <li>
                    <a href={`tel:${info.phone}`}> Утас: {info.phone} </a>
                  </li>
                  <li>
                    <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
                  </li>
                  <li>Хаяг: {info.address}</li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
