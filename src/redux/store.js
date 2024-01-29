import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal.slice";
import modalRegisterSlice from "./modalRegister.slice";
import modalConfirm from "./modalConfirm";
import userSlice from "./user.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    modalRegister: modalRegisterSlice,
    modalConfirm:modalConfirm
  },
});

export default store;
