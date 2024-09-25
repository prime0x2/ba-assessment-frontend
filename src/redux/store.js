import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "./user/slice";

// Persist configuration for the user and preferences state
const persistConfig = {
  storage,
  key: "userSlice",
  whitelist: ["user", "isAuthenticated", "preferences"],
};
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    userSlice: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
