import Side from "components/Page/Side";
import NotFound from "components/NotFound";
import PageDetails from "components/Page/Details";
import OnlyData from "components/Page/OnlyData";
import { getAdsSide } from "lib/ads";
import { getNews } from "lib/news";
import { getIdPage, getPage } from "lib/page";

export default async function Page({ params: { pageid } }) {
  const data = await getIdPage(pageid);
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
              <OnlyData data={data} pageid={pageid} />
            </div>
            <div className="col-xl-3">
              <Side
                ads={ads}
                newNews={newNews}
                fireNews={fireNews}
                menu={data.menus}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
