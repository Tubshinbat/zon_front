import "bootstrap/dist/css/bootstrap.css";
import Footer from "components/Footer";
import { getWebInfo } from "lib/webinfo";
import Script from "next/script";
import "styles/global.css";
import "styles/laptop.css";
import "styles/mobile.css";
import "animate.css";
import "antd/dist/reset.css";
import { getFooterMenus } from "lib/menus";
import { getSocials } from "lib/socialLinks";
import "aos/dist/aos.css";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import { use } from "react";
import { getInitCosts } from "lib/cost";

TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

export default async function RootLayout({ children }) {
  const { webInfo } = await getWebInfo();
  const { menus } = await getFooterMenus();
  const { socialLinks } = await getSocials();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <link
        href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css`}
      />
      <head />
      <body>
        {children}

        <Footer info={webInfo} menus={menus} socialLinks={socialLinks} />
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <Script
        src="https://kit.fontawesome.com/8c5f1b6ac5.js"
        crossorigin="anonymous"
      />
      <Script src="/js/scripts.js" />
    </html>
  );
}
