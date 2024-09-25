import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { clearUserSlice } from "@/redux/user/slice";

const useAuth = () => {
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove("ba-token");
    dispatch(clearUserSlice());
  };

  return {
    logout,
  };
};

export default useAuth;
