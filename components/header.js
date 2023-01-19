"use client";
import base from "lib/base";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default ({ info, menus, socialLinks }) => {
  const pathname = usePathname();

  const renderMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id} className={pathname == el.direct && "active"}>
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

  useEffect(() => {
    // window.onscroll = () => {
    //   let header = document.querySelector(".main__header");
    //   let sticky = header.offsetTop;
    //   if (window.pageYOffset > sticky) {
    //     header.classList.add(`headerSticky`);
    //   } else {
    //     header.classList.remove(`headerSticky`);
    //   }
    // };
  }, []);

  return (
    <>
      <header className="header">
        <div className="container">
          <nav>
            <div className="header__logo">
              <a href="/">
                <img src={`${base.cdnUrl}/${info.logo}`} />
              </a>
            </div>
            <ul className="header__menus">{renderMenu(menus)}</ul>
          </nav>
        </div>
      </header>
    </>
  );
};
