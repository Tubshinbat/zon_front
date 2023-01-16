import AdsDetails from "components/Announcement/Details";
import Side from "components/Announcement/Side";
import NewsDetails from "components/News/NewsDetails";
import NewsSide from "components/News/NewsSide";
import { getAds, getAdsSide } from "lib/ads";
import base from "lib/base";
import { getNews } from "lib/news";

import { use } from "react";

export default function Page({ params: { adsid } }) {
  const { ads: adsData } = use(getAds(adsid));
  const { ads } = use(getAdsSide());

  const { news: fireNews } = use(
    getNews(`status=true&sort=views:descend&limit=9`)
  );
  const { news: newNews } = use(getNews(`status=true&limit=9`));

  const shareUrl = `${base.baseUrl}announce/${adsid}`;

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12">
              <AdsDetails ads={adsData} shareUrl={shareUrl} />
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12">
              <Side ads={adsData} newNews={newNews} fireNews={fireNews} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// export async function generateStaticParams() {
//   const { news } = await getNews(`status=true&limit=5`);

//   return news.map((post) => ({
//     newsid: post._id,
//   }));
// }
