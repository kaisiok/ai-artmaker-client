import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import userReducer from "./user";
import modalReducer from "./modal";
import imgReducer from "./img";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedImgReducer = persistReducer(persistConfig, imgReducer);

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: persistedUserReducer,
    modal: modalReducer,
    img: persistedImgReducer,
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
