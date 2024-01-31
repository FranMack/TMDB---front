import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalProfileSlice = createSlice({
  name: "modalProfileState",
  initialState,
  reducers: {
    setModalProfileState: (state, action) => {
      console.log("modalSlice", action.payload);
      return action.payload;
    },
  },
});

export const { setModalProfileState } = modalProfileSlice.actions;
export default modalProfileSlice.reducer;
