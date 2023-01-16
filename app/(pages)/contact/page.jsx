import ContactPage from "components/Contact/ContactPage";
import { getWebInfo } from "lib/webinfo";
import { use } from "react";

export default function Page() {
  const { webInfo } = use(getWebInfo());
  return (
    <>
      <ContactPage webInfo={webInfo} />
    </>
  );
}
