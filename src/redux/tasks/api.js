import axios from "axios";
import Cookies from "js-cookie";

import { CONSTANT } from "@/utility/constant";

export const create = async (token, bodyData) => {
  const { data } = await axios({
    url: CONSTANT.TASK.CREATE.url,
    method: CONSTANT.TASK.CREATE.method,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAll = async (token) => {
  const { data } = await axios({
    url: CONSTANT.TASK.GET_ALL.url,
    method: CONSTANT.TASK.GET_ALL.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getById = async (token, id) => {
  const { data } = await axios({
    url: CONSTANT.TASK.GET_BY_ID.url.replace(":id", id),
    method: CONSTANT.TASK.GET_BY_ID.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const update = async (token, { id, bodyData }) => {
  const { data } = await axios({
    url: CONSTANT.TASK.UPDATE.url.replace(":id", id),
    method: CONSTANT.TASK.UPDATE.method,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const remove = async (token, bodyData) => {
  const { data } = await axios({
    url: CONSTANT.TASK.DELETE.url,
    method: CONSTANT.TASK.DELETE.method,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
