import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getMember } from "lib/member";


export default async function Head({ params }) {
  let img = "";
  const { member } = await getMember(params.id);

  if (member.pictures && member.pictures[0]) {
    img = base.cdnUrl + "/" + member.pictures[0];
  } else {
    img = "/images/img_notfound.jpg";
  }
  return (
    <>
      <title>{member.firstName}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          htmlToText(member.shortAbout, {
            limits: 10,
          }).length > 170
            ? htmlToText(member.shortAbout, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(member.shortAbout, {
                limits: 10,
              })
        }
      />
      <meta property="og:title" content={`${member.firstName} ${member.lastName}`} />
      <meta
        property="og:description"
        content={
          htmlToText(member.shortAbout, {
            limits: 10,
          }).length > 170
            ? htmlToText(member.shortAbout, {
                limits: 10,
              }).substr(0, 170) + "..."
            : htmlToText(member.shortAbout, {
                limits: 10,
              })
        }
      />
      <meta property="og:image" content={img} />
    </>
  );
}
