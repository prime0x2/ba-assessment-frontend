import React from "react";
import { Form, Input, Button } from "antd";
import { Controller, useForm } from "react-hook-form";

import useToast from "@/hooks/useToast";
import GoogleLogo from "@/assets/google-logo.svg";

const LoginForm = () => {
  const toast = useToast();

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
    toast.success("Login successful");

    console.log("🚀 prime0x2 | login-form.js | onSubmit | data -->\n", data);
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
        // loading={isPending}
        // disabled={isPending}
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

      <Button
        type='default'
        className='mb-2 mt-4 flex h-10 w-full items-center justify-center text-sm font-medium text-slate-600'
        icon={<img src={GoogleLogo} alt='Google Logo' className='mr-2 h-5 w-5' />}
      >
        Continue with Google
      </Button>
    </Form>
  );
};

export default LoginForm;
