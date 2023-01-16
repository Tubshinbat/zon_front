import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getMenus = async () => {
  let menus = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/menus`, {
    cache: "force-cache",
    next: { revalidate: 360 },
  });

  if (result) {
    menus = result.data;
  }

  return { menus, error };
};

export const getFooterMenus = async () => {
  let menus = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/footermenus`, {
    cache: "force-cache",
    next: { revalidate: 360 },
  });
  if (result) menus = result.data;

  return { menus, error };
};
