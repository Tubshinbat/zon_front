"use client";
import base from "lib/base";
import Link from "next/link";

export default ({ info, menus, socialLinks }) => {
  const renderCategories = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el, index) => {
        let dly = 0.2 * index;
        myCategories.push(
          <div
            key={el._id}
            className={`${
              !child && "col-lg-3"
            } wow animate__animated animate__fadeInDown`}
            data-wow-delay={`${dly}s`}
          >
            {!child && <div className="footerTitle">{el.name}</div>}

            {!el.isDirect && !el.model && child && (
              <Link href={`/page/${el.slug}`}>{el.name}</Link>
            )}

            {el.isDirect && child && (
              <a href={el.direct} target="_blank">
                {el.name}
              </a>
            )}

            {el.model && child && <Link href={`/${el.model}`}>{el.name}</Link>}
            {el.children.length > 0 && !child ? (
              <ul>{renderCategories(el.children, true, el.slug)}</ul>
            ) : null}
          </div>
        );
      });

    return myCategories;
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="0.8s"
            >
              <div className="footer-about">
                {info.whiteLogo && (
                  <Link href="/">
                    <img src={`${base.cdnUrl}/${info.whiteLogo}`} />
                  </Link>
                )}
                <p className="footerDescription">{info.siteInfo}</p>
              </div>
            </div>
            {renderCategories(menus)}
            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="1.2s"
            >
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

            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="1.4s"
            >
              <div className="socialsLinks">
                {socialLinks &&
                  socialLinks.map((el) => (
                    <a href={el.link} target="_blank" key={`${el._id}-social`}>
                      <i
                        className={`fa-brands fa-${el.name.toLowerCase()}`}
                      ></i>
                      {el.name.toLowerCase()}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footerBottom">
        © {new Date().getFullYear()} он бүх эрх хуулиар хамгаалагдсан
      </div>
    </>
  );
};
