import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface UserState {
  isLogin: Boolean;
  userId: string;
}

const initialState: UserState = {
  isLogin: false,
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user; // 추가
export default userSlice.reducer;
