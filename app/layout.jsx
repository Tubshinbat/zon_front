import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";
import "styles/global.css";
import "styles/laptop.css";
import "styles/mobile.css";
import "animate.css";
import "antd/dist/reset.css";
import "aos/dist/aos.css";
import { getWebInfo } from "lib/webinfo";
import Header from "components/header";
import { getMenus } from "lib/menus";
import { getSocials } from "lib/socialLinks";
import Footer from "components/footer";

export default async function RootLayout({ children }) {
  const { webInfo } = await getWebInfo();
  const { menus } = await getMenus();
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

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />

      <head />
      <body>
        <Header info={webInfo} menus={menus} socialLinks={socialLinks} />
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
