import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import defaultimg from "../img/03.jpg";

interface ImgState {
  img: string;
}

const initialState: ImgState = {
  img: "defaultimg",
};

export const imgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    },
    setDefault: (state) => {
      state.img = "defaultimg";
    },
  },
});

export const imgActions = imgSlice.actions;
export const selectImg = (state: RootState) => state.img; // 추가
export default imgSlice.reducer;
