import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearUserSlice } from "@/redux/user/slice";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("ba-token");
    dispatch(clearUserSlice());
    navigate("/");
  };

  return {
    logout,
  };
};

export default useAuth;
