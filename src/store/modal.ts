import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ModalState {
  isOpen: boolean;
  confirmFn: string;
  closeFn: string;
  bodyMessage: string;
  headerMessage: string;
  showCloseButton: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  confirmFn: "just_close",
  closeFn: "just_close",
  bodyMessage: "",
  headerMessage: "",
  showCloseButton: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    setConfirmFn: (state, action: PayloadAction<string>) => {
      state.confirmFn = action.payload;
    },
    setCloseFn: (state, action: PayloadAction<string>) => {
      state.closeFn = action.payload;
    },
    setBodyMessage: (state, action: PayloadAction<string>) => {
      state.bodyMessage = action.payload;
    },
    setHeaderMessage: (state, action: PayloadAction<string>) => {
      state.headerMessage = action.payload;
    },
    setShowCloseButton: (state, action: PayloadAction<boolean>) => {
      state.showCloseButton = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal; // 추가
export default modalSlice.reducer;
