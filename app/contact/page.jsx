import Bread from "components/bread";
import Contact from "components/contact";
import { getWebInfo } from "lib/webinfo";

export default async () => {
      const { webInfo } = await getWebInfo();
  return (
    <>
      <Bread title={"Холбоо барих"} />
      <Contact webInfo={webInfo}/>
    </>
  );
};
