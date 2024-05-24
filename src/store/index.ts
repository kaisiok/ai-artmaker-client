import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import userReducer from "./user";
import modalReducer from "./modal";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
