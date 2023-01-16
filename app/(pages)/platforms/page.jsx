import AdsList from "components/Announcement/List";
import Side from "components/Announcement/Side";
import PlatformList from "components/Platforms/List";
import { getAdsies, getAdsSide } from "lib/ads";
import { getNews } from "lib/news";
import { getPlatforms } from "lib/platforms";
import { use } from "react";

export default async function Page() {
  const { platforms, pagination } = await getPlatforms();
  const { ads } = await getAdsSide();

  const { news: fireNews } = await getNews(
    `status=true&sort=views:descend&limit=9`
  );
  const { news: newNews } = await getNews(`status=true&limit=9`);
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              <PlatformList platforms={platforms} />
            </div>
            <div className="col-xl-3">
              <Side fireNews={fireNews} newNews={newNews} ads={ads} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
