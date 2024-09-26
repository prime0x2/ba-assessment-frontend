import React from "react";
import { Button } from "antd";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";

import useToast from "@/hooks/useToast";
import { CONSTANT } from "@/utility/constant";
import { googleLogin } from "@/redux/user/slice";
import GoogleLogo from "@/assets/google-logo.svg";

const GoogleButton = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.userSlice);

  const googleLoginHandler = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(googleLogin(tokenResponse))
        .unwrap()
        .then((response) => {
          if (response.token) {
            Cookies.set("ba-token", response.token, { expires: 7 });
            toast.success("Login successful");
          }
        })
        .catch((error) => {
          console.log("🚀 prime0x2 | google-button.js | googleLoginHandler | googleLogin | error -->\n", error);
          toast.error(error.message || CONSTANT.DEFAULT_ERROR_TEXT, 5);
        });
    },
    onError: (error) => {
      console.error("🚀 prime0x2 | google-button.js | googleLoginHandler | error -->\n", error);
      toast.error(error.message || CONSTANT.DEFAULT_ERROR_TEXT, 5);
    },
  });

  return (
    <Button
      type='default'
      className='mb-2 mt-4 flex h-10 w-full items-center justify-center text-sm font-medium text-slate-600'
      icon={<img src={GoogleLogo} alt='Google Logo' className='mr-2 h-5 w-5' />}
      disabled={loading}
      onClick={googleLoginHandler}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
