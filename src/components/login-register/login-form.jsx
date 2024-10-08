import React from "react";
import Cookies from "js-cookie";
import { Form, Input, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import useToast from "@/hooks/useToast";
import { CONSTANT } from "@/utility/constant";
import { loginUser } from "@/redux/user/slice";
import GoogleButton from "@/components/google-button";

const LoginForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userSlice);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((response) => {
        if (response.token) {
          Cookies.set("ba-token", response.token, { expires: 7 });
          toast.success("Login successful");
        }
      })
      .catch((error) => {
        console.error("🚀 prime0x2 | login-form.js | onSubmit | error -->\n", error);
        toast.error(error.message || CONSTANT.DEFAULT_ERROR_TEXT, 5);
      });
  };

  return (
    <Form
      layout='vertical'
      className='flex flex-col items-center justify-center px-5 sm:px-20'
      onFinish={handleSubmit(onSubmit)}
    >
      <h2 className='text-center text-3xl font-bold text-blue-500'>
        Welcome back!
        <span className='block text-base font-normal text-gray-500'>Sign in to your account</span>
      </h2>

      <Form.Item
        label={<span className='text-sm font-medium'>Email</span>}
        validateStatus={errors.email ? "error" : ""}
        help={
          errors.email && <p className='mt-2 text-xs font-medium tracking-wide text-red-500'>{errors.email.message}</p>
        }
        className='mb-0 mt-2 w-full'
      >
        <Controller
          name='email'
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input {...field} type='email' placeholder='Enter your email' size='large' className='h-10 text-sm' />
          )}
        />
      </Form.Item>

      <Form.Item
        label={<span className='text-sm font-medium'>Password</span>}
        validateStatus={errors.password ? "error" : ""}
        help={
          errors.password && (
            <p className='mt-2 text-xs font-medium tracking-wide text-red-500'>{errors.password.message}</p>
          )
        }
        className='mb-0 mt-3 w-full'
      >
        <Controller
          name='password'
          control={control}
          rules={{
            required: "Password is required",
          }}
          render={({ field }) => (
            <Input.Password {...field} placeholder='Enter your password' size='large' className='h-10 text-sm' />
          )}
        />
      </Form.Item>

      <Button
        type='primary'
        htmlType='submit'
        className='mt-4 h-10 w-full text-sm font-medium'
        loading={loading}
        disabled={loading}
      >
        Sign In
      </Button>

      <div className='mt-4 text-sm font-medium'>
        <span className='text-slate-700'>Don&#39;t have an account? </span>
        <span className='cursor-pointer text-blue-600 hover:text-blue-600 hover:underline'>Sign Up</span>
      </div>

      <div className='mt-4 flex w-full items-center justify-center'>
        <div className='w-full border-t border-gray-300'></div>
        <span className='px-3 text-sm font-medium text-gray-500'>OR</span>
        <div className='w-full border-t border-gray-300'></div>
      </div>

      <GoogleButton />
    </Form>
  );
};

export default LoginForm;
