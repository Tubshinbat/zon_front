import { getPage } from "lib/page";
import { use } from "react";

import PageDetails from "components/Page/Details";
import Side from "components/Page/Side";
import { getAdsSide } from "lib/ads";
import { getNews } from "lib/news";

export default async function Page({ params: { slug } }) {
  const data = await getPage(slug);
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
              <PageDetails data={data} />
            </div>
            <div className="col-xl-3">
              <Side
                ads={ads}
                newNews={newNews}
                fireNews={fireNews}
                menus={data.menus}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
