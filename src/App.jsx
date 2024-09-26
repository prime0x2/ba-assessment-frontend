import React from "react";
import { Provider } from "react-redux";
import { ConfigProvider, App as AntApp } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";

import Router from "@/router";
import Loader from "@/components/Loader";
import store, { persistor } from "@/redux/store";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
