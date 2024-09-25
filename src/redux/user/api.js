import axios from "axios";

import { CONSTANT } from "@/utility/constant";

export const register = async (bodyData) => {
  const { data } = await axios({
    url: CONSTANT.USER.REGISTER.url,
    method: CONSTANT.USER.REGISTER.method,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const login = async (bodyData) => {
  const { data } = await axios({
    url: CONSTANT.USER.LOGIN.url,
    method: CONSTANT.USER.LOGIN.method,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const loginWithGoogle = async (bodyData) => {
  const { data } = await axios({
    url: CONSTANT.USER.GOOGLE_LOGIN.url,
    method: CONSTANT.USER.GOOGLE_LOGIN.method,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};
