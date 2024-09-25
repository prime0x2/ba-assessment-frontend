import React from "react";
import { ConfigProvider, App as AntApp } from "antd";

import Router from "@/router";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Roboto, sans-serif",
          borderRadius: 5,
          colorTextPlaceholder: "#797a7c",
        },
      }}
    >
      <AntApp>
        <Router />
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
