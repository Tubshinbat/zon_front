import AdsList from "components/Announcement/List";
import Side from "components/Announcement/Side";
import PartnerList from "components/Partners/List";
import PlatformList from "components/Platforms/List";
import { getAdsSide } from "lib/ads";
import { getNews } from "lib/news";
import { getPartners } from "lib/partners";
import { use } from "react";

export default function Page() {
  const { partners, pagination } = use(getPartners());
  const { ads } = use(getAdsSide());

  const { news: fireNews } = use(
    getNews(`status=true&sort=views:descend&limit=4`)
  );
  const { news: newNews } = use(
    getNews(`status=true&sort=createAt:descend&limit=4`)
  );

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              <PartnerList partners={partners} pagination={pagination} />
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
