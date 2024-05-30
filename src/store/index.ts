import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import modalReducer from "./modal";
import imgReducer from "./img";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedImgReducer = persistReducer(persistConfig, imgReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    modal: modalReducer,
    img: persistedImgReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
