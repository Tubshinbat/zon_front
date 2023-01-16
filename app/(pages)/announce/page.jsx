import AdsList from "components/Announcement/List";
import Side from "components/Announcement/Side";
import { getAdsies, getAdsSide } from "lib/ads";
import { getNews } from "lib/news";

export default async function Page() {
  const { adsies, pagination } = await getAdsies();
  const { ads } = await getAdsSide();

  const { news: fireNews } = await getNews(
    `status=true&sort=views:descend&limit=4`
  );
  const { news: newNews } = await getNews(
    `status=true&sort=createAt:descend&limit=4`
  );
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              <AdsList pagination={pagination} adsies={adsies} />
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
