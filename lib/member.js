import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getMembers = async (query) => {
  let members = [];
  let pagination = {};
  let error = null;

  const result = await fetcher(`${base.apiUrl}/members?${query}`, {
    cache: "force-cache",
    next: { revalidate: 360 },
  });

  if (result) {
    members = result.data;
    pagination = result.pagination;
  }

  return { members, pagination, error };
};

export const getMember = async (id) => {
  let member = {};
  const result = await fetcher(`${base.apiUrl}/members/${id}`);

  if (result) {
    member = result.data;
  }
  return { member };
};
