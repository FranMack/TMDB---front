import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalRegisterSlice = createSlice({
  name: "modalRegisterState",
  initialState,
  reducers: {
    setModalRegisterState: (state, action) => {
      console.log("modalSlice", action.payload);
      return action.payload;
    },
  },
});

export const { setModalRegisterState } = modalRegisterSlice.actions;
export default modalRegisterSlice.reducer;
