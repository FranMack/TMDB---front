import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      console.log("modalSlice", action.payload);
      return action.payload;
    },
  },
});

export const { setModalState } = modalSlice.actions;
export default modalSlice.reducer;
