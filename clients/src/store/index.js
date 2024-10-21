import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";

let store = configureStore({
  reducer: { courseSlice },
});

export default store;
