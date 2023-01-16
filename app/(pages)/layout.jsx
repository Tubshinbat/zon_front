import Header from "components/Header";
import { getMenus } from "lib/menus";
import { getSocials } from "lib/socialLinks";
import { getWebInfo } from "lib/webinfo";
import Script from "next/script";

export default async function RootLayout({ children }) {
  const { webInfo } = await getWebInfo();
  const { menus } = await getMenus();
  const { socialLinks } = await getSocials();

  return (
    <main>
      <Header menus={menus} info={webInfo} socialLinks={socialLinks} />
      {children}
    </main>
  );
}
