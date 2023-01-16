import NewsDetails from "components/News/NewsDetails";
import NewsSide from "components/News/NewsSide";
import { getAdsSide } from "lib/ads";
import base from "lib/base";
import { getCategories, getContent, getNews } from "lib/news";

import { use } from "react";

export default function Page({ params: { newsid } }) {
  const { news } = use(getContent(newsid));
  const { ads } = use(getAdsSide());
  const { categories } = use(getCategories(`status=true`));
  const { news: fireNews } = use(
    getNews(`status=true&sort=views:descend&limit=9`)
  );
  const { news: newNews } = use(getNews(`status=true&limit=9`));

  const shareUrl = `${base.baseUrl}news/${newsid}`;

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12">
              <NewsDetails news={news} shareUrl={shareUrl} />
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12">
              <NewsSide
                ads={ads}
                categories={categories}
                newNews={newNews}
                fireNews={fireNews}
              />
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
