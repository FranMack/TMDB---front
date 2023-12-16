import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal.slice";
import modalRegisterSlice from "./modalRegister.slice";
import userSlice from "./user.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    modalRegister: modalRegisterSlice,
  },
});

export default store;
