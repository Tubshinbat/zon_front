import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getPlatform } from "lib/platforms";
import { usePathname } from "next/navigation";

export default async function Head({ params }) {
  let img = "";
  const { platform } = await getPlatform(params.platformid);
  if (platform.pictures && platform.pictures[0]) {
    img = base.cdnUrl + "/" + platform.pictures[0];
  } else {
    img = "/images/img_notfound.jpg";
  }
  return (
    <>
      <title>{platform.name}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          htmlToText(platform.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(platform.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(platform.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:title" content={platform.name} />
      <meta
        property="og:description"
        content={
          htmlToText(platform.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(platform.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(platform.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:image" content={img} />
    </>
  );
}
