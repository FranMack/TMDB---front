import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  movieId: null,
};

const modalConfirmSlice = createSlice({
  name: "modalConfirmState",
  initialState,
  reducers: {
    setModalConfirmState: (state, action) => {
      console.log("modalConfirmState", action.payload);
      return action.payload;
    },
  },
});

export const { setModalConfirmState } = modalConfirmSlice.actions;
export default modalConfirmSlice.reducer;
