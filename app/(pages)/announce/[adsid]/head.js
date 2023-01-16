import { htmlToText } from "html-to-text";
import { getAds } from "lib/ads";
import base from "lib/base";

export default async function Head({ params }) {
  let img = "";
  const { ads } = await getAds(params.adsid);
  if (ads.pictures && ads.pictures[0]) {
    img = base.cdnUrl + "/" + ads.pictures[0];
  } else {
    img = "/images/img_notfound.jpg";
  }
  return (
    <>
      <title>{ads.name}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          htmlToText(ads.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(ads.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(ads.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:title" content={ads.name} />
      <meta
        property="og:description"
        content={
          htmlToText(ads.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(ads.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(ads.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:image" content={img} />
    </>
  );
}
