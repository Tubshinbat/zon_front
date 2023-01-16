"use client";
import base from "lib/base";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faClock,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "./Home/mobileMenu";
import { useEffect } from "react";

export default ({ info, menus, socialLinks }) => {
  function justNumbers(string) {
    let numsStr = string.replace(/[^0-9]/g, "");
    return parseInt(numsStr);
  }

  const renderMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id} className={el.children.length > 0 && "dropMenu"}>
            {el.isDirect === true && <a href={el.direct}>{el.name}</a>}
            {el.isModel === true && (
              <Link href={`/${el.model}`} scroll={false}>
                {el.name}
              </Link>
            )}

            {el.isDirect === false && el.isModel === false && (
              <Link href={`/page/${el.slug}`} scroll={false}>
                {" "}
                {el.name}
              </Link>
            )}

            {el.children.length > 0 && !child ? (
              <ul className={`dropdownMenu`}>
                {renderMenu(el.children, true, el.slug)}
              </ul>
            ) : null}
          </li>
        );
      });

    return myCategories;
  };

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".main__header");

      let sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add(`headerSticky`);
      } else {
        header.classList.remove(`headerSticky`);
      }
    };
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbarContainer">
            <div className="topContact">
              <div className="topSocials">
                {socialLinks &&
                  socialLinks.map((el) => (
                    <a href={el.link} target="_blank" key={el._id + "social"}>
                      <i
                        className={`fa-brands fa-${el.name.toLowerCase()}`}
                      ></i>
                    </a>
                  ))}
              </div>
              <div className="topLinks">
                <a href={`tel:${info.phone}`}>
                  <i className="fa-solid fa-phone"></i>
                  {info.phone}
                </a>
                <a href={`mailto:${info.email}`}>
                  <i className="fa-solid fa-envelope"></i>
                  {info.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mainHeader main__header`}>
        <div className="container">
          <div className="header ">
            <div className={`logo`}>
              <Link href="/">
                <img src={`${base.cdnUrl}/${info.logo}`} />
              </Link>
            </div>
            <nav>
              <ul className={`headerMenu`}>{renderMenu(menus)}</ul>
            </nav>
            <div className={`headerContact`}>
              <a href={`tel:${info.phone && justNumbers(info.phone + "")}`}>
                <FontAwesomeIcon icon={faPhoneVolume} /> {info.phone}{" "}
              </a>
            </div>
            <MobileMenu info={info} socialLinks={socialLinks} menus={menus} />
          </div>
        </div>
      </div>
    </>
  );
};
