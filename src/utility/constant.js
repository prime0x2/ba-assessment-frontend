export const API = import.meta.env.VITE_DEV_API_URL;

export const CONSTANT = {
  DEFAULT_ERROR_TEXT: "Something went wrong. Please try again.",
  USER: {
    REGISTER: {
      url: `${API}/user/register`,
      method: "POST",
    },
    LOGIN: {
      url: `${API}/user/login`,
      method: "POST",
    },
    GOOGLE_LOGIN: {
      url: `${API}/user/google-login`,
      method: "POST",
    },
  },
};
