import React from "react";
import { Segmented } from "antd";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import LoginVector from "@/assets/login-vector.svg";
import { LoginForm, RegisterForm } from "@/components/login-register";

const Home = () => {
  const [activeTab, setActiveTab] = React.useState("login");

  const isAuthenticated = useSelector((state) => state.userSlice.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='flex flex-wrap items-center justify-center bg-slate-50 sm:p-10 md:min-h-dvh'>
      <div className='mx-auto grid h-dvh w-full max-w-6xl grid-cols-1 divide-x-[1px] overflow-hidden rounded-3xl border bg-white shadow-lg sm:h-auto sm:grid-cols-2'>
        <div className='hidden h-full w-full items-center justify-center bg-blue-600/10 p-5 sm:flex'>
          <img src={LoginVector} alt='Login Vector' className='hidden w-80 object-cover sm:block' />
        </div>

        <div className='flex min-h-screen flex-col justify-center p-5 sm:block sm:min-h-0'>
          <Segmented
            size='large'
            value={activeTab}
            onChange={(value) => setActiveTab(value)}
            className='w-full'
            options={[
              { label: "Login", value: "login", className: "w-full" },
              { label: "Register", value: "register", className: "w-full" },
            ]}
          />

          <div className='mt-5'>
            {activeTab === "login" ? <LoginForm setActiveTab={setActiveTab} /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
