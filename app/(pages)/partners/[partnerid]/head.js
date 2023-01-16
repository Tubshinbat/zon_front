import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getPartner } from "lib/partners";
import { getPlatform } from "lib/platforms";
import { usePathname } from "next/navigation";

export default async function Head({ params }) {
  let img = "";
  const { partner } = await getPartner(params.partnerid);
  if (partner.cover) {
    img = base.cdnUrl + "/" + partner.cover;
  } else {
    img = "/images/img_notfound.jpg";
  }
  return (
    <>
      <title>{partner.name}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          htmlToText(partner.companyInfo, {
            limits: 10,
          }).length > 170
            ? htmlToText(partner.companyInfo, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(partner.companyInfo, {
                limits: 10,
              })
        }
      />
      <meta property="og:title" content={partner.name} />
      <meta
        property="og:description"
        content={
          htmlToText(partner.companyInfo, {
            limits: 10,
          }).length > 170
            ? htmlToText(partner.companyInfo, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(partner.companyInfo, {
                limits: 10,
              })
        }
      />
      <meta property="og:image" content={img} />
    </>
  );
}
