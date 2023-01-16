import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getContent } from "lib/news";
import { getIdPage, getPage } from "lib/page";
import { usePathname } from "next/navigation";

export default async function Head({ params }) {
  let img = "";
  const data = await getPage(params.slug);
  const page = data.page;

  if (page && page.pictures && page.pictures[0]) {
    img = base.cdnUrl + "/" + page.pictures[0];
  } else {
    img = "/images/img_notfound.jpg";
  }
  return (
    <>
      <title>{(page && page.name) || "Барилга хөгжлийн төв"}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          page &&
          htmlToText(page.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(page.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(page && page.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:title" content={page && page.name} />
      <meta
        property="og:description"
        content={
          page &&
          htmlToText(page.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(page.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(page && page.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:image" content={img} />
    </>
  );
}
