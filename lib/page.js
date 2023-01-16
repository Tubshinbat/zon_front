import base from "./base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getPageFull = async (query) => {
  let pages = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/pages/excel?${query}`);

  if (result) {
    pages = result.data;
  }

  return { pages, error };
};

export const getPages = async (query) => {
  let pages = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/pages?${query}`, {
    cache: "force-cache",
    next: { revalidate: 60 },
  });

  if (result) {
    pages = result.data;
    pagination = result.pagination;
  }

  return { pages, pagination, error };
};

export const getIdPage = async (id) => {
  let page = {};
  let news = [];
  let childPages = [];
  let menus = [];
  let pages = [];
  const result = await fetcher(`${base.apiUrl}/pages/${id}`);
  if (result) {
    page = result.data;
    news = result.news;
    childPages = result.childPages;
    menus = result.menus;
    pages = result.pages;
  }
  const data = { page, news, childPages, menus, pages };
  return data;
};

export const getPage = async (slug) => {
  let page = {};
  let news = [];
  let menu = {};
  let pages = [];
  let menus = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/pages/slug/${slug}`);

  if (result) {
    page = result.page;
    news = result.news;
    menu = result.menu;
    pages = result.pages;
    menus = result.menus;
  }
  const data = { page, news, menu, pages, menus };
  return data;
};
