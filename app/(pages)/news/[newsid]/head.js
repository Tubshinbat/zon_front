import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getContent } from "lib/news";
import { usePathname } from "next/navigation";

export default async function Head({ params }) {
  let img = "";
  const { news } = await getContent(params.newsid);
  if (news.pictures && news.pictures[0]) {
    img = base.cdnUrl + "/" + news.pictures[0];
  } else {
    img = "/images/img_notfound.jpg";
  }
  return (
    <>
      <title>{news.name}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          htmlToText(news.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(news.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(news.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:title" content={news.name} />
      <meta
        property="og:description"
        content={
          htmlToText(news.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(news.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(news.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:image" content={img} />
    </>
  );
}
