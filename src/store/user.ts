import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface UserState {
  isLogin: Boolean;
}

const initialState: UserState = {
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLogin = true;
    },
    logout: (state, action: PayloadAction<any>) => {
      state.isLogin = false;
    },
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user; // 추가
export default userSlice.reducer;
