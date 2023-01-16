import HomeHeader from "components/Home/header";
import Platforms from "components/Home/platforms";
import HomeAds from "components/Home/ads";
import { getAdsHome, getAdsies } from "lib/ads";
import { getBanners } from "lib/banners";
import { getMenus } from "lib/menus";
import { getNews } from "lib/news";
import { getPlatforms } from "lib/platforms";
import { getServices } from "lib/services";
import { getWebInfo } from "lib/webinfo";
import NewsTop from "components/Home/newsTop";
import Chart from "components/Home/chart";
import Partner from "components/Home/partner";
import { Suspense, use } from "react";
import { getSocials } from "lib/socialLinks";
import { getCosts, getCostTypes, getInitCosts } from "lib/cost";
import { getPartners } from "lib/partners";
import Gallerys from "components/Home/gallerys";
import { getGallerys } from "lib/gallerys";
import base from "lib/base";
import Script from "next/script";
import Loading from "./loading";
import { getFaqs } from "lib/faq";
import Faqs from "components/Home/faq";

export default async function Page() {
  const { banners, error } = await getBanners();
  const { webInfo } = await getWebInfo();
  const { menus } = await getMenus();
  const { news } = await getNews(`status=true&star=true&limit=3`);
  const { socialLinks } = await getSocials();
  const { news: newsStar } = await getNews(`status=true&star=true&limit=4`);
  const { news: fireNews } = await getNews(
    `status=true&sort=views:descend&limit=9`
  );
  const { news: newNews } = await getNews(`status=true&limit=9`);
  const { news: newsCat } = await getNews(
    `status=true&categories=Барилга угсралт&limit=3`
  );
  const { news: newsCat1 } = await getNews(
    `status=true&categories=Үйл явдал&limit=3`
  );
  const { news: newsVideo } = await getNews(
    `status=true&categories=Ярилцлага&limit=3`
  );
  const { platforms } = await getPlatforms(`status=true`);
  const { homeAds } = await getAdsHome();
  const { services } = await getServices(`status=true`);
  const { adsies } = await getAdsies(`status=true&limit=6`);
  const { costs } = await getCosts(`status=true&limit=8`);
  const { costTypes } = await getCostTypes(`status=true`);
  const { partners } = await getPartners(`status=true&limit=10`);
  const { gallerys } = await getGallerys(`limit=5`);
  const { initCosts, maxCosts } = await getInitCosts();
  const { faqs } = await getFaqs(`limit=3`);
  return (
    <div>
      <main>
        <Suspense fallback={<Loading />}>
          <HomeHeader
            banners={banners}
            webInfo={webInfo}
            menus={menus}
            news={news}
            socialLinks={socialLinks}
          />

          <Platforms platforms={platforms} />
          <HomeAds homeAds={homeAds} />
          <NewsTop
            newsStar={newsStar}
            fireNews={fireNews}
            newNews={newNews}
            services={services}
            newsCat={newsCat}
            newsCat1={newsCat1}
            newsVideo={newsVideo}
            adsies={adsies}
          />
          <Chart
            costs={costs}
            initCosts={initCosts}
            maxCosts={maxCosts}
            costTypes={costTypes}
          />
          <Partner partners={partners} />
          <Faqs faqs={faqs} />
          <Gallerys gallerys={gallerys} />
        </Suspense>
      </main>
      <Script src="/js/scripts.js" crossorigin="anonymous" />
    </div>
  );
}
