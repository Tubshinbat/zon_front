import Faq from "components/Faq";
import FaqDetails from "components/Faq/Details";
import Side from "components/Page/Side";
import { getAdsSide } from "lib/ads";
import { getFaq } from "lib/faq";
import { getNews } from "lib/news";
import { use } from "react";

export default function Page({ params: { faqid } }) {
  const { faq } = use(getFaq(faqid));

  const { ads } = use(getAdsSide());
  const { news: fireNews } = use(
    getNews(`status=true&sort=views:descend&limit=9`)
  );
  const { news: newNews } = use(getNews(`status=true&limit=9`));
  return (
    <>
      <div className="faq__detials_header">
        <h2>{faq.name}</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <FaqDetails faq={faq} />
          </div>
          <div className="col-xl-3">
            <Side ads={ads} newNews={newNews} fireNews={fireNews} />
          </div>
        </div>
      </div>
    </>
  );
}
