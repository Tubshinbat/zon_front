import Side from "components/Announcement/Side";
import PlatformDetails from "components/Platforms/Details";
import { getAdsSide } from "lib/ads";
import base from "lib/base";
import { getNews } from "lib/news";
import { getPlatform } from "lib/platforms";

import { use } from "react";

export default function Page({ params: { platformid } }) {
  const { platform } = use(getPlatform(platformid));
  const { ads } = use(getAdsSide());

  const { news: fireNews } = use(
    getNews(`status=true&sort=views:descend&limit=9`)
  );
  const { news: newNews } = use(getNews(`status=true&limit=9`));

  const shareUrl = `${base.baseUrl}announce/${platformid}`;

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12">
              <PlatformDetails
                platform={platform}
                shareUrl={shareUrl}
                pid={platformid}
              />
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12">
              <Side ads={ads} newNews={newNews} fireNews={fireNews} />
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
