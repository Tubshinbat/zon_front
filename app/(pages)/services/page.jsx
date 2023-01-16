import Side from "components/Announcement/Side";
import PlatformList from "components/Platforms/List";
import ServiceList from "components/Services/List";
import { getAdsSide } from "lib/ads";
import { getNews } from "lib/news";
import { getServices } from "lib/services";
import { use } from "react";

export default async function Page() {
  const { services, pagination } = await getServices();
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
              <ServiceList services={services} pagination={pagination} />
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
