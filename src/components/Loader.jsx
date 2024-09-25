import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className='flex h-dvh items-center justify-center'>
      <Spin size='large' />
    </div>
  );
};

export default Loader;
