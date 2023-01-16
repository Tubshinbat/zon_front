import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getPlatform } from "lib/platforms";
import { getService } from "lib/services";
import { usePathname } from "next/navigation";

export default async function Head({ params }) {
  let img = "";
  const { service } = await getService(params.serviceid);
  if (service.pictures && service.pictures[0]) {
    img = base.cdnUrl + "/" + service.pictures[0];
  } else {
    img = "/images/img_notfound.jpg";
  }
  return (
    <>
      <title>{service.name}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          htmlToText(service.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(service.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(service.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:title" content={service.name} />
      <meta
        property="og:description"
        content={
          htmlToText(service.details, {
            limits: 10,
          }).length > 170
            ? htmlToText(service.details, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(service.details, {
                limits: 10,
              })
        }
      />
      <meta property="og:image" content={img} />
    </>
  );
}
