import Faq from "components/Faq";
import { getFaqs } from "lib/faq";
import { use } from "react";

export default function Page() {
  const { faqs, pagination } = use(getFaqs(`status=true`));
  return (
    <>
      <Faq faqs={faqs} pagination={pagination} />
    </>
  );
}
